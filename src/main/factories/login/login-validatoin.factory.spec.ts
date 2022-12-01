import { makeLoginValidationComposite } from './login-validatoin.factory'
import { ValidationComposite, RequiredFieldsValidation, EmailValidation } from '../../../presentation/validators'
import { ValidationInterface } from '../../../presentation/interfaces/validation.interface'
import { EmailValidatorAdapter } from '../../../shared/email-validator.adapter'

jest.mock('../../../presentation/validators/validation.composite')

describe('Login Validation Factory', () => {
  test('should Validation with all validations', async () => {
    makeLoginValidationComposite()
    const validations: ValidationInterface [] = []
    for (const fieldName of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(fieldName))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})