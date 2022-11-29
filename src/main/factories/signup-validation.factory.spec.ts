import { RequiredFieldsValidation } from '../../presentation/validators/required-fields.validation'
import { ValidationComposite } from '../../presentation/validators/validation.composite'
import { ValidationInterface } from '../../presentation/validators/validation.interface'
import { makeSignupControler } from './signup.factory'

jest.mock('../../presentation/validators/validation.composite')

describe('Signup Validation Factory', () => {
  test('should call Validation with all validations', async () => {
    makeSignupControler()
    const validations: ValidationInterface [] = []
    for (const fieldName of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(fieldName))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
