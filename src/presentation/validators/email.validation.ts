import { InvalidParamError } from '@/presentation/errors'
import { EmailValidatorInterface } from '@/presentation/interfaces'
import { ValidationInterface } from '@/presentation/interfaces/validation.interface'

export class EmailValidation implements ValidationInterface {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidatorInterface
  ) {}

  validate (input: any): Error {
    const isValidEmail = this.emailValidator.execute(input[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
