import { EmailValidatorInterface } from '../interfaces'
import { EmailValidation } from './email.validation'

const makeEmailValidatorStub = (): EmailValidatorInterface => {
  class EmailValidatorStub implements EmailValidatorInterface {
    async execute (email: string): Promise<boolean> {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Email Validation', () => {
  test('should call EmailValidation with correct email', async () => {
    const emailValidatorStub = makeEmailValidatorStub()
    const sut = new EmailValidation('email', emailValidatorStub)
    const spy = jest.spyOn(emailValidatorStub, 'execute')
    await sut.validate({ email: 'anyEmail@email.com' })
    expect(spy).toHaveBeenCalledWith('anyEmail@email.com')
  })
})
