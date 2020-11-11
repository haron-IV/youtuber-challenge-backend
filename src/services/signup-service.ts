import { hash } from 'bcrypt'
import { User } from '../models/user-model'
import { logger } from '../application/logger'
import { sendMail } from '../services/mailer-service'
import { generateConfirmationCode } from '../services/helpers/random-number'
import { notAllowedUsernames } from '../config/not-allowed-usernames'
import { errObj } from './helpers/errors'
import { passwordsAreSameInterface, signupUserInreface, saveSignupInreface } from '../interfaces/services/signup-interface'

const passwordsAreSame = (data: passwordsAreSameInterface): Boolean => {
  const {password1, password2, res} = data
  
  if (password1 !== password2) {
    logger.error('Passwords are not the same')
    res.status(500).json(errObj('Passwords are not the same.'))
    return false
  }
  return true
}

const saveUser = async (data: saveSignupInreface) => {
  const { email, hashedPassword, res } = data

  if (!await checkIfEmailExist(email)) {
    const confirmationCode: String = generateConfirmationCode()
    const user = new User({
      email,
      password: hashedPassword,
      signupDate: new Date,
      confirmationCode
    })
  
    await user.save()
    .then( (): void => {
      logger.info(`User ${email} signed up.`)
      sendMail({
        to: email,
        subject: 'Youtuber challenge account verification',
        message: `Hello. Next step is veryfication account. Retype this code in application: ${confirmationCode}`
      })
      res.status(201).json({message: 'User signed up.'})
    })
    .catch((err): void => {
      res.status(500).json({ error: err })
    })
  } else {
    res.status(500).json({ error: "Email in use." })
  }
}

const checkIfUsernameExist = async (username: String): Promise<Boolean> => {
  return await User.find({ username })
  .then((user): Boolean => {
    if (user.length !== 0) return true
    return false
  })
  .catch((err): Boolean => { 
    logger.error(err)
    return false
  })
}

const checkIfEmailExist = async (email: string): Promise<Boolean> => {
  return await User.find({email})
  .then((user): Boolean => {
    if(user.length !== 0) return true
    return false
  })
  .catch((err): Boolean => {
    logger.error(err)
    return false
  })
}

const signupUser = async (signupUser: signupUserInreface) => {
  const { email, password, res } = signupUser

  hash(password, 10, async (err, hashedPassword) => {
    if(err) return res.status(500).json({ error: err })
    else saveUser({ email, hashedPassword, res })
  })
}

const setUsername = async (email: string, username: string): Promise<Response | Object | undefined> => {
  if (await checkIfUsernameIsAllowed(username)) {
    await User.update({email}, {username})
    .then(res => {
      logger.info('Username settled.')
      res.status(201).json(true)
    })
    .catch(err => { logger.error(err)} )
  } else {
    logger.info(`Cannot set this username: ${username}`)
    return new Promise((resolve) => {
      // {msg: ``, status: 500}
      resolve(errObj('Cannot use this username. Please choose another one.'))
    })
  }
}

const getVerificationCode = async (email: string | undefined) => await User.find({ email }, 'confirmationCode')

const checkIfUsernameExistOnNotAllowedUsernamesList = (username: string): boolean => {
  const usernames = notAllowedUsernames
  if(usernames.indexOf(username) !== -1) return false

  logger.info(`${username} cannot be used cuz it is on not allowed nicknames list`)
  return true
}

const checkIfUsernameIsAllowed = async (username: string): Promise<boolean> => {
  if (!await checkIfUsernameExist(username) && checkIfUsernameExistOnNotAllowedUsernamesList(username)) return true
  return false
}

export { passwordsAreSame, signupUser, getVerificationCode, setUsername }