import { ValidationInterface } from '../interfaces/validation.interface'

export class ValidationComposite implements ValidationInterface {
  constructor (private readonly validations: ValidationInterface []) {}
  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
