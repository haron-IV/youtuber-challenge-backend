import { Application } from "express";
import { logger } from '../application/logger'

const port: String | undefined = process.env.API_PORT

const server = (app: Application): void => {
  app.listen(port, (): void => {
    logger.info(`Server is running on port ${port}`)
  })
}

export { server }