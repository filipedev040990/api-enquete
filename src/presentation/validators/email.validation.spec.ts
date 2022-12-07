import { InvalidParamError } from '../errors'
import { EmailValidatorInterface } from '../interfaces'
import { EmailValidation } from './email.validation'
import { ValidationInterface } from '../interfaces/validation.interface'

interface SutType {
  sut: ValidationInterface
  emailValidatorStub: EmailValidatorInterface
}

const makeEmailValidatorStub = (): EmailValidatorInterface => {
  class EmailValidatorStub implements EmailValidatorInterface {
    execute (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new EmailValidation('email', emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('Email Validation', () => {
  test('should call EmailValidation with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const spy = jest.spyOn(emailValidatorStub, 'execute')
    sut.validate({ email: 'anyEmail@email.com' })
    expect(spy).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return 400 if EmailValidator return false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'execute').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'anyEmail@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('should throw an error if EmailValidator throw an exception', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
