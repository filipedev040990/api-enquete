import { CompareFieldsValidation } from '../../presentation/validators/compare-fields.validation'
import { RequiredFieldsValidation } from '../../presentation/validators/required-fields.validation'
import { ValidationComposite } from '../../presentation/validators/validation.composite'
import { ValidationInterface } from '../../presentation/validators/validation.interface'

export const makeValidationComposite = (): ValidationComposite => {
  const validations: ValidationInterface [] = []
  for (const fieldName of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(fieldName))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
