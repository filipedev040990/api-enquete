import { InvalidParamError } from '../errors'
import { ValidationInterface } from '../interfaces/validation.interface'

export class CompareFieldsValidation implements ValidationInterface {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
