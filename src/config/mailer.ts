import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE_NAME,
  auth: {
    user: process.env.MAIL_USER_NAME,
    pass: process.env.MAIL_USER_PASSWORD
  }
})

export { transporter }