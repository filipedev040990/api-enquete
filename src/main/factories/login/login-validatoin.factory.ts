import { RequiredFieldsValidation, ValidationComposite, EmailValidation } from '../../../presentation/validators'
import { ValidationInterface } from '../../../presentation/interfaces/validation.interface'
import { EmailValidatorAdapter } from '../../../shared/email-validator.adapter'

export const makeLoginValidationComposite = (): ValidationComposite => {
  const validations: ValidationInterface [] = []
  for (const fieldName of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(fieldName))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
