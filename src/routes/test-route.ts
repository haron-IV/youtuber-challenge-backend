import exporess, { Request, Response } from 'express'
const router = exporess.Router()

import { Test } from '../models/test'

router.get('/', (req: Request, res: Response) => {
  return res.send('works')
})

router.post('/', async (req: Request, res: Response) => {
  const {title, description} = req.body
  console.log(req);
  
  const test = new Test({
    title: title,
    description: description
  })

  await test.save()
  res.status(201).json({title, description})
})

export { router as testRouter }