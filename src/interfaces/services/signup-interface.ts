import { Response } from 'express'

interface passwordsAreSameInterface {
  password1: String;
  password2: String;
  res: Response;
}

interface signupUserInreface {
  email: string;
  password: string;
  retypedPassword: string;
  res: Response;
}

interface saveSignupInreface {
  email: string;
  hashedPassword: string;
  res: Response;
}

export { passwordsAreSameInterface, signupUserInreface, saveSignupInreface }