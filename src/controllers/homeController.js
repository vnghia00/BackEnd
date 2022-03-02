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
    return res.send('post CRUD')
}

const getCRUD = async (req, res) => {
    const data = await CRUDSevice.getAllUser()
    return res.render('getCRUD.ejs', {
        dataTable: data,
    })
}

module.exports = {
    getHomePage: getHomePage,
    getSigupPage: getSigupPage,
    postCRUD: postCRUD,
    getCRUD: getCRUD,
}