const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const {
  loginValidation,
  registerValidation
} = require('../validator/user.validator')
module.exports = {
  userRegister: async (req, res) => {
    try {
      const validation = registerValidation(req.body)
      if (validation.error) {
        throw new Error(validation.message)
      }
      const user = await new User(validation.data)
      const token = await user.generateAuthToken()
      user.save()
      res.cookie('authToken', token)
      return res.status(201).redirect('/')
    } catch (error) {
      return res.status(400).render('register', {
        data: {},
        isAuthenticated: false,
        error: true,
        errorMessage: error.message
      })
    }
  },
  userLogin: async (req, res) => {
    try {
      const validation = loginValidation(req.body)
      if (validation.error) {
        throw new Error(validation.message)
      }
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        throw new Error('Wrond email and Password Combination ')
      }
      const isPassword = await bcrypt.compare(req.body.password, user.password)
      if (!isPassword) {
        throw new Error('Wrond email and Password Combination ')
      }
      const token = await user.generateAuthToken()
      await user.save()
      res.cookie('authToken', token)
      return res.status(300).redirect('/')
    } catch (error) {
      return res.status(400).render('login', {
        data: {},
        isAuthenticated: false,
        error: true,
        errorMessage: error.message
      })
    }
  },
  userLogoutAll: async (req, res) => {
    try {
      const user = req.user
      if (!user) {
        throw new Error('User not Found')
      }
      user.tokens = []
      await user.save()
      res.clearCookie('authToken')
      return res.status(300).redirect('/')
    } catch (error) {
      return res.status(500).render('profile', {
        data: {
          name: req.user.name,
          email: req.user.email
        },
        isAuthenticated: req.isAuthenticated,
        error: true,
        errorMessage: error.message
      })
    }
  },
  userLogout: async (req, res) => {
    try {
      const user = req.user
      if (!user) {
        throw new Error('User not Found')
      }
      user.tokens = user.tokens.filter((token) => token !== req.token)
      await user.save()
      res.clearCookie('authToken')
      return res.status(300).redirect('/')
    } catch (error) {
      return res.status(500).render('profile', {
        data: {
          name: req.user.name,
          email: req.user.email
        },
        isAuthenticated: req.isAuthenticated,
        error: true,
        errorMessage: error.message
      })
    }
  }
}
