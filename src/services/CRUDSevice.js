import bcrypt from 'bcryptjs'
import db from '../models'

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

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve('*** Create a new user succeed')
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.users.findAll({
                raw: true,
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

const getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.users.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }

        } catch (e) {
            reject(e)
        }
    })
}

const updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.users.findOne({
                where: { id: data.id },
            })
            if (user) {
                user.fullName = data.fullName
                user.phoneNumber = data.phoneNumber
                user.address = data.address
                user.gender = data.gender
                await user.save();

                const newAllUser = await db.users.findAll({
                    raw: true,
                })

                resolve(newAllUser)
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.users.findOne({
                where: { id: userId },
            })
            if (user) {
                await user.destroy()
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUser: deleteUser
}