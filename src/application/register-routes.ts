import { Application } from 'express'
import { testRouter } from '../routes/test-route'

const registerAppRoutes = (app: Application): void => {
  app.use('/test', testRouter)
}

export { registerAppRoutes }