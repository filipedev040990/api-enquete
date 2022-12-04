import { AuthenticationUseCaseInterface, AuthenticationRequest } from '../../../domain/use-cases/authentication/authentication.interface'
import env from '../../../main/env'
import { MissingParamError } from '../../errors'
import { badRequest, serverError, success, unauthorized } from '../../helpers/http.helper'
import { EmailValidatorInterface, HttpRequest } from '../../interfaces'
import { ValidationInterface } from '../../interfaces/validation.interface'
import { AuthenticationController } from './authentication.controller'

type SutType = {
  sut: AuthenticationController
  emailValidatorStub: EmailValidatorInterface
  authenticationUseCaseStub: AuthenticationUseCaseInterface
  validationStub: ValidationInterface
}

const makeSut = (): SutType => {
  const authenticationUseCaseStub = makeAuthenticationUseCaseStub()
  const emailValidatorStub = makeEmailValidatorStub()
  const validationStub = makeValidation()
  const sut = new AuthenticationController(authenticationUseCaseStub, validationStub)
  return { sut, emailValidatorStub, authenticationUseCaseStub, validationStub }
}

const makeEmailValidatorStub = (): EmailValidatorInterface => {
  class EmailValidatorStub implements EmailValidatorInterface {
    execute (email: string): boolean {
      return true
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

const makeValidation = (): ValidationInterface => {
  class ValidationStub implements ValidationInterface {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
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

  test('should call AuthenticationUseCase with correct values', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    const spy = jest.spyOn(authenticationUseCaseStub, 'execute')
    await sut.execute(httpRequest)
    expect(spy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 401 if authentication failed', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'execute').mockReturnValueOnce(null)
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(unauthorized())
  })

  test('should return an access token on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(success({ token: 'anyToken', expiresIn: env.encrypter.expiresIn }))
  })

  test('should return 500 AuthenticationUseCase throw an exception', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const spy = jest.spyOn(validationStub, 'validate')
    await sut.execute(httpRequest)
    expect(spy).toHaveBeenCalledWith({
      email: 'anyEmail',
      password: 'anyPassword'
    })
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('anyField'))
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('anyField')))
  })
})
