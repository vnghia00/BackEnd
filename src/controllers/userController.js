import userSevice from '../services/userSevice'

const handleLogin = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    const userData = await userSevice.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user || []
    })
}
const handleGetAllUsers = async (req, res) => {
    const id = req.query.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing repuired parameters',
            users: []
        })
    }
    const users = await userSevice.getAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users: users
    })
}
const handleCreateNewUser = async (req, res) => {
    const message = await userSevice.createNewUser(req.body)
    return res.status(200).json(message)
}
const handleEditUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    const data = req.body
    const message = await userSevice.updateUser(data)
    return res.status(200).json(message)
}
const handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    const message = await userSevice.deleteUser(req.body.id)
    return res.status(200).json(message)
}

const getAllcodes = async (req, res) => {
    if (!req.query.type) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    const data = await userSevice.getAllcodesService(req.query.type)
    return res.status(200).json(data)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllcodes: getAllcodes,
}