import bcrypt from 'bcryptjs'
import db from '../models'

const salt = bcrypt.genSaltSync(10)

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

module.exports = {
    createNewUser: createNewUser,
}