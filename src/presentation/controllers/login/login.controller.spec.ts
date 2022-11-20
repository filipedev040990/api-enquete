import { AuthenticationUseCaseInterface, AuthenticationRequest } from '../../../domain/use-cases/authentication/authentication.interface'
import { InvalidParamError, MissinParamError } from '../../errors'
import { badRequest, serverError, success, unauthorized } from '../../helpers/http.helper'
import { EmailValidatorInterface, HttpRequest } from '../../interfaces'
import { LoginController } from './login.controller'

type SutType = {
  sut: LoginController
  emailValidatorStub: EmailValidatorInterface
  authenticationUseCaseStub: AuthenticationUseCaseInterface
}

const makeSut = (): SutType => {
  const authenticationUseCaseStub = makeAuthenticationUseCaseStub()
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub, authenticationUseCaseStub)
  return { sut, emailValidatorStub, authenticationUseCaseStub }
}

const makeEmailValidatorStub = (): EmailValidatorInterface => {
  class EmailValidatorStub implements EmailValidatorInterface {
    async execute (email: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new EmailValidatorStub()
}

const makeAuthenticationUseCaseStub = (): AuthenticationUseCaseInterface => {
  class AuthenticationUseCaseStub implements AuthenticationUseCaseInterface {
    async execute (request: AuthenticationRequest): Promise<string> {
      return await Promise.resolve('anyToken')
    }
  }
  return new AuthenticationUseCaseStub()
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

  test('should return 500 EmailValidator throw an exception', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call AuthenticationUseCase with correct values', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    const spy = jest.spyOn(authenticationUseCaseStub, 'execute')
    await sut.execute(httpRequest)
    expect(spy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 401 if authentication failed', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(unauthorized())
  })

  test('should return an access token on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(success('anyToken'))
  })

  test('should return 500 AuthenticationUseCase throw an exception', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(serverError(new Error()))
  })
})
