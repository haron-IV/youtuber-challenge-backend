import exporess, { NextFunction, Request, Response } from 'express'
const router = exporess.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  
})

export { router as signupRouter }