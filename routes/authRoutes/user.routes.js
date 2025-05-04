const express = require('express')

const userController = require('../../controller/auth/user.Controller')

const router = express.Router()

router.route('/')
             .get(userController.allusers)

router.route('/register')
             .post(userController.register)

router.route('/login')
             .post(userController.Login)


module.exports = router