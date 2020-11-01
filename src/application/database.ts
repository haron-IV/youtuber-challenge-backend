import mongoose from 'mongoose'

const { DB_URL, DB_NAME } = process.env

interface connectionConfig {
  useCreateIndex: boolean,
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean
}

const connect = (config: connectionConfig): void => {
  mongoose.connect(`${DB_URL}${DB_NAME}`, config, () => {
    console.log('Database connected.')
  })
}

const connectDatabase = (): void => {
  connect({useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
}

export { connectDatabase }