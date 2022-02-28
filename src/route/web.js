import express from 'express'
import homeController from '../controllers/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/login', homeController.getLoginPage)


    return app.use("/", router)
}

module.exports = initWebRoutes