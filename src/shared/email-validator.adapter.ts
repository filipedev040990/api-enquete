import { EmailValidatorInterface } from '../presentation/interfaces'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidatorInterface {
  execute (email: string): boolean {
    return validator.isEmail(email)
  }
}
