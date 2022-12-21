import { CompareFieldsValidation, EmailValidation, RequiredFieldsValidation, ValidationComposite } from '@/presentation/validators'
import { ValidationInterface } from '@/presentation/interfaces/validation.interface'
import { EmailValidatorAdapter } from '@/shared/email-validator.adapter'
import { makeSignupValidationComposite } from './signup-validation.factory'

jest.mock('@/presentation/validators/validation.composite')

describe('Signup Validation Factory', () => {
  test('should call Validation with all validations', async () => {
    makeSignupValidationComposite()
    const validations: ValidationInterface [] = []
    for (const fieldName of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(fieldName))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    const emailValidator = new EmailValidatorAdapter()
    validations.push(new EmailValidation('email', emailValidator))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
