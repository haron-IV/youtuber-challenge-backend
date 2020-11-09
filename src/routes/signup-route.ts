import exporess, { NextFunction, Request, Response } from 'express'
const router = exporess.Router()
import { passwordsAreSame, signupUser, getVerificationCode, setUsername } from '../services/signup-service'

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { email, password, retypedPassword } = req.body

  if(passwordsAreSame({ password1: password, password2: retypedPassword, res })) {
    signupUser({email, password, retypedPassword, res})
  }
})

router.get('/confirmation-code', async (req: Request, res: Response) => {
  const email = JSON.parse(req.query.email as string)

  res.status(200).json(await getVerificationCode(email.value))
})


router.patch('/set-username', async (req: Request, res: Response) => {
  const { username, email } = req.body

  await setUsername(email, username).then(user => {
    res.status(201).json(user)
  })
})
export { router as signupRouter }