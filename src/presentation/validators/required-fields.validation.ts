import { MissingParamError } from '@/presentation/errors'
import { ValidationInterface } from '@/presentation/interfaces/validation.interface'

export class RequiredFieldsValidation implements ValidationInterface {
  constructor (private readonly fieldName: string) {}
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
