const express = require('express')
const { getAllUsers, registerController, loginController } = require('../controllers/userController')

//router object
const router = express.Router()

//get users
router.get('/all-users', getAllUsers)

//create user
router.post('/register',registerController)

//login
router.post('/login', loginController)


module.exports = router