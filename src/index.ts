require('dotenv').config()
import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'

import { testRouter } from './routes/test-route'

const app = express()
app.use(json())
app.use(testRouter)

mongoose.connect('mongodb://localhost:27017/youtuber-challenge', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Database connected.')
})

const port: String | undefined = process.env.API_PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})