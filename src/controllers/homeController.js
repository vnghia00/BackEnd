import db from '../models/index'
import CRUDSevice from '../services/CRUDSevice'

const getHomePage = async (req, res) => {
    try {
        const data = await db.users.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })

    } catch (e) {
        console.log(e)
    }
}


const getSigupPage = (req, res) => {
    return res.render('sigup.ejs')
}

const postCRUD = async (req, res) => {
    const message = await CRUDSevice.createNewUser(req.body)
    console.log(message)
    return res.send('CRUD')
}

module.exports = {
    getHomePage: getHomePage,
    getSigupPage: getSigupPage,
    postCRUD: postCRUD,
}