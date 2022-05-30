import db from "../models/index"
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
// hash Password
const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            const isExist = await checkUserEmail(email)
            if (isExist) {
                const user = await db.users.findOne({
                    attributes:
                        //define columns don't want
                        // exclude: ['password'],
                        //define columns want to show
                        ['email', 'roleId', 'password']
                    ,
                    where: { email: email },
                    raw: true,
                })
                const check = bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0
                    userData.message = "Ok"
                    delete user.password
                    userData.user = user
                } else {
                    userData.errCode = 3
                    userData.errMessage = "Wrong password"
                }
            } else {
                userData.errCode = 1
                userData.errMessage = "Your's Email isn't exist"
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.users.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.users.findAll({
                    //define columns don't want
                    attributes: { exclude: ['password'] }
                })
            } else {
                if (userId) {
                    users = await db.users.findOne({
                        attributes: { exclude: ['password'] },
                        where: { id: userId }
                    })
                }
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmail = await checkUserEmail(data.email)
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Plz try another email!'
                })
            }
            else {
                const hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'OK Create a new user succeed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // raw = false : save()
            const user = await db.users.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.fullName = data.fullName || user.fullName
                user.phoneNumber = data.phoneNumber || user.phoneNumber
                user.address = data.address || user.address
                user.gender = data.gender || user.gender
                user.roleId = data.roleId || user.roleId
                await user.save()
                resolve({
                    errCode: 0,
                    message: 'OK Update the user succeed!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `The user not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // raw = false : destroy()
            const user = await db.users.findOne({
                where: { id: id },
                raw: false,
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist!`
                })
            }
            await user.destroy()
            resolve({
                errCode: 0,
                message: 'OK the user is deleted!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllcodesService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters!`
                })
            } else {
                const allcodes = await db.allcodes.findAll({
                    where: { type: typeInput },
                })
                if (allcodes.length === 0) {
                    resolve({
                        errCode: 2,
                        errMessage: `The typeInput isn't exist!`
                    })
                } else {
                    resolve({
                        errCode: 0,
                        message: 'OK get allcodes succeed!',
                        data: allcodes
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllcodesService: getAllcodesService,
}