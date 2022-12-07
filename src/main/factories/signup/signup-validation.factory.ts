import { CompareFieldsValidation, EmailValidation, RequiredFieldsValidation, ValidationComposite } from '../../../presentation/validators'
import { ValidationInterface } from '../../../presentation/interfaces/validation.interface'
import { EmailValidatorAdapter } from '../../../shared/email-validator.adapter'

export const makeSignupValidationComposite = (): ValidationComposite => {
  const validations: ValidationInterface [] = []
  for (const fieldName of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(fieldName))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
