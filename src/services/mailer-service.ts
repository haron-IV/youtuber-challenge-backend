import { transporter } from '../config/mailer'
import { logger } from '../application/logger'

interface createMailInterface {
  to: string;
  subject: string;
  message: string;
}

const createMail = (config: createMailInterface) => {
  const {to, subject, message} = config
  const mailOptions = {
    from: process.env.MAIL_USER_NAME,
    to,
    subject,
    text: message
  }

  return mailOptions
}

const sendMail = (config: createMailInterface): void => {
  transporter.sendMail( createMail(config), (error, info) => {
    if (error) {
      logger.error(error)
    } else {
      logger.info(`Email sent: ${info.response}`)
    }
  })
}

export { sendMail }