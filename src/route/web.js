import express from 'express'
import homeController from '../controllers/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/sigup', homeController.getSigupPage)
    router.post('/post-crud', homeController.postCRUD)



    return app.use("/", router)
}

module.exports = initWebRoutes