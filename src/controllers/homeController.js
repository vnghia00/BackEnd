import db from '../models/index'

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


const getLoginPage = (req, res) => {
    return res.render('log/login.ejs')
}

module.exports = {
    getHomePage: getHomePage,
    getLoginPage: getLoginPage,
}