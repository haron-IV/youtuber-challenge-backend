import { Application } from 'express'
import { signupRouter } from '../routes/signup-route'

const registerAppRoutes = (app: Application): void => {
  app.use('/signup', signupRouter)
}

export { registerAppRoutes }