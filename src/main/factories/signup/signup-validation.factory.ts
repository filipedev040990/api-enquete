import { CompareFieldsValidation } from '../../../presentation/validators/compare-fields.validation'
import { EmailValidation } from '../../../presentation/validators/email.validation'
import { RequiredFieldsValidation } from '../../../presentation/validators/required-fields.validation'
import { ValidationComposite } from '../../../presentation/validators/validation.composite'
import { ValidationInterface } from '../../../presentation/validators/validation.interface'
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
