
import { AccountModel } from '../../../domain/models/account.model'
import { AddAccountInterface, AddAccountRequest } from '../../../domain/use-cases/signup/add-account.interface'
import { MissinParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http.helper'
import { ValidationInterface } from '../../validators/validation.interface'
import SignupController from './signup.controller'

interface SutType {
  sut: SignupController
  addAccountStubUseCase: AddAccountInterface
  validationStub: ValidationInterface
}

const makeSut = (): SutType => {
  const addAccountStubUseCase = makeAddAccountStub()
  const validationStub = makeValidation()
  const sut = new SignupController(addAccountStubUseCase, validationStub)
  return { sut, addAccountStubUseCase, validationStub }
}

const makeAddAccountStub = (): AddAccountInterface => {
  class AddAccountStub implements AddAccountInterface {
    async execute (account: AddAccountRequest): Promise<AccountModel> {
      const fakeAccount = {
        id: 'anyId',
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'hashedPassword'
      }
      return await Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): ValidationInterface => {
  class ValidationStub implements ValidationInterface {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
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

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(request)
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).not.toBeNull()
    expect(response.body).toHaveProperty('name')
    expect(response.body.name).not.toBeNull()
    expect(response.body).toHaveProperty('email')
    expect(response.body.email).not.toBeNull()
    expect(response.body).toHaveProperty('password')
    expect(response.body.password).not.toBeNull()
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
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissinParamError('anyField'))
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('anyField')))
  })
})
