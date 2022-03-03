import express from 'express'
import homeController from '../controllers/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/signUp', homeController.getSigupPage)

    router.post('/postSignUp', homeController.postSignUp)

    router.get('/getUser', homeController.getUser)

    router.get('/editUser', homeController.editUser)

    router.post('/putEditUser', homeController.putEditUser)



    return app.use("/", router)
}

module.exports = initWebRoutes