import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Test = mongoose.model('Test', testSchema)


export { Test }