const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const auth = async function (req, res, next) {
  try {
    const token = req.cookies.authToken
    const decoded = jwt.verify(token, config.jwtSecret)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
      throw new Error('Please authenticate.')
    } else {
      req.user = user
      req.isAuthenticated = true
      req.token = token
      next()
    }
  } catch (error) {
    req.errorMessage = 'Please authenticate'
    req.isAuthenticated = false
    next()
    // res.send({
    //   error: true,
    //   data: {},
    //   errorMessage: error.message
    // })
  }
}
module.exports = auth
