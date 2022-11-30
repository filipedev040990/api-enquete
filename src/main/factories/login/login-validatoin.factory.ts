import { EmailValidation } from '../../../presentation/validators/email.validation'
import { RequiredFieldsValidation } from '../../../presentation/validators/required-fields.validation'
import { ValidationComposite } from '../../../presentation/validators/validation.composite'
import { ValidationInterface } from '../../../presentation/validators/validation.interface'
import { EmailValidatorAdapter } from '../../../shared/email-validator.adapter'

export const makeLoginValidationComposite = (): ValidationComposite => {
  const validations: ValidationInterface [] = []
  for (const fieldName of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(fieldName))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
