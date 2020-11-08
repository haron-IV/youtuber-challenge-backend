import exporess, { NextFunction, Request, Response } from 'express'
const router = exporess.Router()
import { passwordsAreSame, signupUser } from '../services/signup-service'

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { email, password, retypedPassword } = req.body

  if(passwordsAreSame({ password1: password, password2: retypedPassword, res })) {
    signupUser({email, password, retypedPassword, res})
  }
})

export { router as signupRouter }