import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  signupDate: {
    type: Date,
    required: true
  },
  registrationConfirmed: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  },
  userType: {
    type: String,
    default: 'user'
  }
})

const User = mongoose.model('user', userSchema)


export { User }