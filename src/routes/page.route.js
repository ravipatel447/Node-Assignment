const express = require('express')
const pageController = require('../controllers/page.controller')
const userAuth = require('../middleware/auth.middleware')
const pageRouter = express.Router()

pageRouter.get('/', userAuth, pageController.getHome)
pageRouter.get('/home', userAuth, pageController.getHome)
pageRouter.get('/about', userAuth, pageController.getAbout)
pageRouter.get('/services', userAuth, pageController.getService)
pageRouter.get('/categories', userAuth, pageController.getCatagory)
pageRouter.get('/login', userAuth, pageController.getLogin)
pageRouter.get('/register', userAuth, pageController.getRegister)
pageRouter.get('/profile', userAuth, pageController.getProfile)
pageRouter.get('/*', userAuth, pageController.get404)

module.exports = pageRouter
