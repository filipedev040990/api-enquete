
import { AccountModel } from '../../../domain/use-cases/models/account.model'
import { AddAccountInterface, AddAccountRequest } from '../../../domain/use-cases/signup/add-account.interface'
import { InvalidParamError, MissinParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http.helper'
import { EmailValidatorInterface } from '../../interfaces/email-validator.interface'
import SignupController from './signup.controller'

interface SutType {
  sut: SignupController
  emailValidatorStub: EmailValidatorInterface
  addAccountStubUseCase: AddAccountInterface
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidatorStub()
  const addAccountStubUseCase = makeAddAccountStub()
  const sut = new SignupController(emailValidatorStub, addAccountStubUseCase)
  return { sut, emailValidatorStub, addAccountStubUseCase }
}

const makeEmailValidatorStub = (): EmailValidatorInterface => {
  class EmailValidatorStub implements EmailValidatorInterface {
    async execute (email: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new EmailValidatorStub()
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

  test('should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    request.body.name = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('name')))
  })

  test('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    request.body.email = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('email')))
  })

  test('should return 400 if password is not provided', async () => {
    const { sut } = makeSut()
    request.body.password = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('password')))
  })

  test('should return 400 if password confirmation is not provided', async () => {
    const { sut } = makeSut()
    request.body.passwordConfirmation = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('passwordConfirmation')))
  })

  test('should return 400 if password confirmation failed', async () => {
    const { sut } = makeSut()
    request.body.passwordConfirmation = 'anotherPassword'
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new InvalidParamError('password confirmation failed')))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const spy = jest.spyOn(emailValidatorStub, 'execute')
    await sut.execute(request)
    expect(spy).toHaveBeenCalledWith(request.body.email)
  })

  test('should return 400 if EmailValidator return false', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'execute').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should return 500 if EmailValidator throw an exception', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(request)
    expect(response).toEqual(serverError())
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
    expect(response.statusCode).toBe(200)
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
      throw new Error()
    })
    const response = await sut.execute(request)
    expect(response).toEqual(serverError())
  })
})
