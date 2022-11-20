import { InvalidParamError, MissinParamError } from '../../errors'
import { badRequest } from '../../helpers/http.helper'
import { EmailValidatorInterface, HttpRequest } from '../../interfaces'
import { LoginController } from './login.controller'

type SutType = {
  sut: LoginController
  emailValidatorStub: EmailValidatorInterface
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)
  return { sut, emailValidatorStub }
}

const makeEmailValidatorStub = (): EmailValidatorInterface => {
  class EmailValidatorStub implements EmailValidatorInterface {
    async execute (email: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new EmailValidatorStub()
}

let httpRequest: HttpRequest

describe('', () => {
  beforeEach(() => {
    httpRequest = {
      body: {
        email: 'anyEmail',
        password: 'anyPassword'
      }
    }
  })

  test('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    httpRequest.body.email = null
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(badRequest(new MissinParamError('email')))
  })

  test('should return 400 if password is not provided', async () => {
    const { sut } = makeSut()
    httpRequest.body.password = null
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(badRequest(new MissinParamError('password')))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const spy = jest.spyOn(emailValidatorStub, 'execute')
    await sut.execute(httpRequest)
    expect(spy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('should return 400 if EmailValidator return false', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'execute').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })
})
