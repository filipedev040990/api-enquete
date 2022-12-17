import { makeAuthenticationValidationComposite } from './authentication-validatoin.factory'
import { ValidationComposite, RequiredFieldsValidation, EmailValidation } from '@/presentation/validators'
import { ValidationInterface } from '@/presentation/interfaces/validation.interface'
import { EmailValidatorAdapter } from '@/shared/email-validator.adapter'

jest.mock('@/presentation/validators/validation.composite')

describe('Authentication Validation Factory', () => {
  test('should Validation with all validations', async () => {
    makeAuthenticationValidationComposite()
    const validations: ValidationInterface [] = []
    for (const fieldName of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(fieldName))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
