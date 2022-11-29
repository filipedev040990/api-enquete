import { MissingParamError } from '../errors'
import { ValidationInterface } from './validation.interface'

export class RequiredFieldsValidation implements ValidationInterface {
  constructor (private readonly fieldName: string) {}
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
