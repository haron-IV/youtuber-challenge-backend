import { hash } from 'bcrypt'
import { User } from '../models/user-model'
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

const saveUser = async (data: saveSignupInreface) => {
  const { username, email, hashedPassword, res } = data

  if (!await checkIfduplicated(username, email)) {
    const user = new User({
      username,
      email,
      password: hashedPassword,
      signupDate: new Date
    })
  
    await user
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
  } else {
    res.status(500).json({message: "Email or username was used already"})
  }
}

const checkIfduplicated = async (username: string, email: string) => {
  if (await checkIfUsernameExist(username) || await checkIfEmailExist(email)) return true
  return false
}

const checkIfUsernameExist = async (username: String) => {
  return await User.find({ username })
  .then((user): Boolean => {
    if (user.length !== 0) return true
    return false
  }).catch((err): Boolean => { 
    logger.error(err)
    return false
  })
}

const checkIfEmailExist = async (email: string) => {
  return await User.find({email})
  .then((user): Boolean => {
    if(user.length !== 0) return true
    return false
  }).catch((err): Boolean => {
    logger.error(err)
    return false
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
      saveUser({username, email, hashedPassword, res})
    }
  })
}

export { passwordsAreSame, signupUser }