import { Application } from 'express'
import { testRouter } from '../routes/test-route'
import { signupRouter } from '../routes/signup-route'

const registerAppRoutes = (app: Application): void => {
  app.use('/test', testRouter)
  app.use('/signup', signupRouter)
}

export { registerAppRoutes }