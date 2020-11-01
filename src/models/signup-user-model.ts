import mongoose from 'mongoose'

const signupUserSchema = new mongoose.Schema({
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
  }
})

const Signup = mongoose.model('signup', signupUserSchema)


export { Signup }