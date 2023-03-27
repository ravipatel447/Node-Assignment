const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: [true, 'User Email is Already Exist'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    require: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    config.jwtSecret
  )
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})
userSchema.post('save', function (error, doc, next) {
  if (
    error.keyValue.email != null &&
    error.code === 11000 &&
    error.keyPattern.email === 1
  ) {
    throw new Error('User already Exists with this email')
  }
  if (error) {
    throw new Error(error.message)
  }
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
