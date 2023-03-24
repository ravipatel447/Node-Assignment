const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
const userAuth = require('../middleware/auth.middleware')

userRouter.post('/user/register', userController.userRegister)
userRouter.post('/user/login', userController.userLogin)
userRouter.post('/user/logout', userAuth, userController.userLogout)
userRouter.post('/user/logoutall', userAuth, userController.userLogoutAll)

module.exports = userRouter
