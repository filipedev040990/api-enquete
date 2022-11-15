import { EmailValidatorInterface } from '../presentation/interfaces'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidatorInterface {
  async execute (email: string): Promise<boolean> {
    await validator.isEmail(email)
    return null
  }
}
