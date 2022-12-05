
import { AccountModel } from '../../../domain/models/account.model'
import { AddAccountInterface, AddAccountRequest } from '../../../domain/use-cases/signup/add-account.interface'
import { MissingParamError } from '../../errors'
import { badRequest, resourceConflict, serverError } from '../../helpers/http.helper'
import { ValidationInterface } from '../../interfaces/validation.interface'
import SignupController from './signup.controller'
import { GetAccountByEmailInterface } from '../../../domain/use-cases/signup/get-account-by-email.interface'
import { AuthenticationUseCaseInterface, AuthenticationRequest } from '../../../domain/use-cases/authentication/authentication.interface'

interface SutType {
  sut: SignupController
  addAccountStubUseCase: AddAccountInterface
  validationStub: ValidationInterface
  getAccountByEmailStub: GetAccountByEmailInterface
  authenticationUseCaseStub: AuthenticationUseCaseInterface
}

const makeSut = (): SutType => {
  const addAccountStubUseCase = makeAddAccountStub()
  const validationStub = makeValidation()
  const getAccountByEmailStub = makeGetAccountByEmailStub()
  const authenticationUseCaseStub = makeAuthenticationUseCaseStub()
  const sut = new SignupController(addAccountStubUseCase, validationStub, getAccountByEmailStub, authenticationUseCaseStub)
  return { sut, addAccountStubUseCase, validationStub, getAccountByEmailStub, authenticationUseCaseStub }
}

const fakeAccount = {
  id: 'anyId',
  name: 'anyName',
  email: 'anyEmail@email.com',
  password: 'hashedPassword'
}
const makeAddAccountStub = (): AddAccountInterface => {
  class AddAccountStub implements AddAccountInterface {
    async execute (account: AddAccountRequest): Promise<AccountModel> {
      return await Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountStub()
}

const makeGetAccountByEmailStub = (): GetAccountByEmailInterface => {
  class GetAccountByEmailStub implements GetAccountByEmailInterface {
    async execute (email: string): Promise<AccountModel | null> {
      return null
    }
  }
  return new GetAccountByEmailStub()
}

const makeValidation = (): ValidationInterface => {
  class ValidationStub implements ValidationInterface {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthenticationUseCaseStub = (): AuthenticationUseCaseInterface => {
  class AuthenticationUseCaseStub implements AuthenticationUseCaseInterface {
    async execute (request: AuthenticationRequest): Promise<string> {
      return await Promise.resolve('anyToken')
    }
  }
  return new AuthenticationUseCaseStub()
}

let request

describe('SignupController', () => {
  beforeEach(() => {
    request = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
  })

  test('should call AddAcountUseCase with correct values', async () => {
    const { sut, addAccountStubUseCase } = makeSut()
    const spy = jest.spyOn(addAccountStubUseCase, 'execute')
    await sut.execute(request)
    expect(spy).toHaveBeenCalledWith({
      name: 'anyName',
      email: 'anyEmail@email.com',
      password: 'anyPassword'
    })
  })

  test('should return 500 if AddAcountUseCase throw an exception', async () => {
    const { sut, addAccountStubUseCase } = makeSut()
    jest.spyOn(addAccountStubUseCase, 'execute').mockImplementationOnce(() => {
      throw new Error('failed')
    })
    const response = await sut.execute(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const spy = jest.spyOn(validationStub, 'validate')
    await sut.execute(request)
    expect(spy).toHaveBeenCalledWith({
      name: 'anyName',
      email: 'anyEmail@email.com',
      password: 'anyPassword',
      passwordConfirmation: 'anyPassword'
    })
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('anyField'))
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissingParamError('anyField')))
  })

  test('should call GetAccountByEmail with correct email', async () => {
    const { sut, getAccountByEmailStub } = makeSut()
    const spy = jest.spyOn(getAccountByEmailStub, 'execute')
    await sut.execute(request)
    expect(spy).toHaveBeenCalledWith(request.body.email)
  })

  test('should return 403 if already email in use', async () => {
    const { sut, getAccountByEmailStub } = makeSut()
    jest.spyOn(getAccountByEmailStub, 'execute').mockReturnValueOnce(Promise.resolve(fakeAccount))
    const response = await sut.execute(request)
    expect(response).toEqual(resourceConflict('This email already in use'))
  })

  test('should call AuthenticationUseCase with correct values', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    const spy = jest.spyOn(authenticationUseCaseStub, 'execute')
    await sut.execute(request)
    expect(spy).toHaveBeenCalledWith({
      email: 'anyEmail@email.com',
      password: 'anyPassword'
    })
  })

  test('should return a name and access token on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(request)
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe('anyName')
    expect(response.body.token).toBe('anyToken')
  })

  test('should return 500 AuthenticationUseCase throw an exception', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest.spyOn(authenticationUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(request)
    expect(response).toEqual(serverError(new Error()))
  })
})
