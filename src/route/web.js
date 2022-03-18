import express from 'express'
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'


const router = express.Router()

const initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)

    router.get('/signUp', homeController.getSigupPage)

    router.post('/postSignUp', homeController.postSignUp)

    router.get('/getUser', homeController.getUser)

    router.get('/editUser', homeController.editUser)

    router.post('/putEditUser', homeController.putEditUser)

    router.get('/deleteUser', homeController.deleteUser)

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    return app.use("/", router)
}

module.exports = initWebRoutes