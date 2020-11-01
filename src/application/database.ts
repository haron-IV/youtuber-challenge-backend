import mongoose from 'mongoose'
import { logger } from '../application/logger'

const { DB_URL, DB_NAME } = process.env

interface connectionConfig {
  useCreateIndex: boolean,
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean
}

const connect = (config: connectionConfig): void => {
  mongoose.connect(`${DB_URL}${DB_NAME}`, config, () => {
    logger.info(`Database '${DB_NAME}' connected.`)
  })
}

const connectDatabase = (): void => {
  connect({useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
}

export { connectDatabase }