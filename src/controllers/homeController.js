import db from '../models/index'
import CRUDSevice from '../services/CRUDSevice'

const getHomePage = async (req, res) => {
    try {
        const data = await db.users.findAll()
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })

    } catch (e) {
        console.log(e)
    }
}


const getSigupPage = (req, res) => {
    return res.render('signUp.ejs')
}

const postSignUp = async (req, res) => {
    const message = await CRUDSevice.createNewUser(req.body)
    console.log(message)
    return res.send('post CRUD')
}

const getUser = async (req, res) => {
    const data = await CRUDSevice.getAllUser()
    return res.render('getUser.ejs', {
        dataTable: data,
    })
}

const editUser = async (req, res) => {
    const userId = req.query.id
    if (userId) {
        const userData = await CRUDSevice.getUserInfoById(userId)
        return res.render('editUser.ejs', {
            dataTable: userData,
        })
    } else {
        return res.render('editUser.ejs')
    }
}

const putEditUser = async (req, res) => {
    const data = req.body
    if (data) {
        const newAllUesrsUpdate = await CRUDSevice.updateUserData(data)
        return res.render('getUser.ejs', {
            dataTable: newAllUesrsUpdate,
        })
    } else {
        return res.send('ko co data')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getSigupPage: getSigupPage,
    postSignUp: postSignUp,
    getUser: getUser,
    editUser: editUser,
    putEditUser: putEditUser,
}