import { hash } from 'bcrypt'
import { User } from '../models/user-model'
import { logger } from '../application/logger'
import { sendMail } from '../services/mailer-service'
import { generateConfirmationCode } from '../services/helpers/random-number'
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
  const { email, hashedPassword, res } = data

  if (!await checkIfEmailExist(email)) {
    const confirmationCode = generateConfirmationCode()
    const user = new User({
      email,
      password: hashedPassword,
      signupDate: new Date,
      confirmationCode
    })
  
    await user
    .save()
    .then( (): void => {
      logger.info(`User ${email} signed up.`)
      sendMail({
        to: email,
        subject: 'Youtuber challenge account verification',
        message: `Hello. Next step is veryfication account. Retype this code in application: ${confirmationCode}`
      })
      res.status(201).json({
        message: 'User signed up.'
      })
    }).catch((err): void => {
      res.status(500).json({
        error: err
      })
    })
  } else {
    res.status(500).json({ message: "Email was used already" })
  }
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
  const { email, password, res } = signupUser

  hash(password, 5, async (err, hashedPassword) => {
    if(err){
      return res.status(500).json({
        error: err
      })
    } else {
      saveUser({ email, hashedPassword, res })
    }
  })
}

const setUsername = async (email: string, username: string) => {
  await User.update({email}, {username}).then(res => {
    logger.info('Username settled.')
  }).catch(err => { 
    logger.error(err) 
  })
}

const getVerificationCode = async (email:string | undefined) => {
  return await User.find({ email }, 'confirmationCode')
}

export { passwordsAreSame, signupUser, getVerificationCode, setUsername }