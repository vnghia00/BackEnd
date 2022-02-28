import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

connectDB()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Backend Nodejs is runing on the port : http://localhost:${port}`);
})



