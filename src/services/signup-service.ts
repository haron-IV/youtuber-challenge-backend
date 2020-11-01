import { hash } from 'bcrypt'
import { Signup } from '../models/signup-user-model'
import { logger } from '../application/logger'
import { passwordsAreSameInterface, signupUserInreface, saveSignupInreface } from '../interfaces/services/signup-interface'

const passwordsAreSame = (data: passwordsAreSameInterface): Boolean => {
  const {password1, password2, res} = data
  
  if (password1 !== password2) {
    logger.error('Passwords are not the same')
    res.status(500).json({
      error: "passwords should be same."
    })
    return false
  }
  return true
}

const saveSignup = (data: saveSignupInreface): void => {
  const { username, email, hashedPassword, res } = data

  const signup = new Signup({
    username,
    email,
    password: hashedPassword,
    signupDate: new Date
  })

  signup
  .save()
  .then( (): void => {
    logger.info(`User ${username} signed up.`)
    res.status(201).json({
      message: 'User signed up.'
    })
  }).catch((err): void => {
    res.status(500).json({
      error: err
    })
  })
}

const signupUser = async (signupUser: signupUserInreface) => {
  const { username, email, password, res } = signupUser

  hash(password, 5, async (err, hashedPassword) => {
    if(err){
      return res.status(500).json({
        error: err
      })
    } else {
      saveSignup({username, email, hashedPassword, res})
    }
  })
}

export { passwordsAreSame, signupUser }