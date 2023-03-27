const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
const userAuth = require('../middleware/auth.middleware')
const multer = require('multer')
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, req.user._id.toString() + '.' + file.mimetype.split('/')[1])
  }
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
userRouter.post('/user/register', userController.userRegister)
userRouter.post('/user/login', userController.userLogin)
userRouter.post('/user/logout', userAuth, userController.userLogout)
userRouter.post('/user/logoutall', userAuth, userController.userLogoutAll)
userRouter.post(
  '/user/profile',
  userAuth,
  multer({ storage: fileStorage, fileFilter }).single('profile'),
  userController.userProfileUpload
)

module.exports = userRouter
