const userRoutes = require('express').Router()
const userController = require('../controller/usercontroller')

userRoutes.post('/register', userController.Register)
userRoutes.post('/login', userController.Login)
userRoutes.post('/googlelogin', userController.googleLogin)

module.exports = userRoutes