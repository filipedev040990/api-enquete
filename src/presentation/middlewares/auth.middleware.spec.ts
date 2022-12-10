import { AuthMiddleware } from './auth.middleware'
import { forbidden, serverError, success } from '../helpers/http.helper'
import { AccessDeniedError } from '../errors/access-denied.error'
import { HttpRequest } from '../interfaces'
import { AccountModel } from '../../domain/models/account.model'
import { GetAccountByTokenUseCaseInterface } from '../../domain/use-cases/account/get-account-by-token.interface'

type SutType = {
  sut: AuthMiddleware
  getAccountByTokenUseCaseStub: GetAccountByTokenUseCaseInterface
}

const makeSut = (role?: string): SutType => {
  const getAccountByTokenUseCaseStub = makeGetAccountByTokenUseCaseStub()
  const sut = new AuthMiddleware(getAccountByTokenUseCaseStub, role)
  return { sut, getAccountByTokenUseCaseStub }
}

const makeGetAccountByTokenUseCaseStub = (): GetAccountByTokenUseCaseInterface => {
  class GetAccountByTokenUseCase implements GetAccountByTokenUseCaseInterface {
    async execute (token: string): Promise<AccountModel | null> {
      return await Promise.resolve(makeFakeAccount())
    }
  }
  return new GetAccountByTokenUseCase()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'anyId',
  email: 'anyEmail@email.com',
  name: 'anyName',
  password: 'hashedPassword',
  token: 'anyToken'
})

const makeRequest = (): HttpRequest => ({
  headers: {
    authorization: 'Bearer anyToken'
  }
})

describe('Auth Middleware', () => {
  test('should return 403 if token is not provided in request header', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call getAccountByToken once and with correct values', async () => {
    const role = 'anyRole'
    const { sut, getAccountByTokenUseCaseStub } = makeSut(role)
    const spy = jest.spyOn(getAccountByTokenUseCaseStub, 'execute')
    await sut.execute(makeRequest())
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyToken', role)
  })

  test('should return 403 if getAccountByToken return null', async () => {
    const { sut, getAccountByTokenUseCaseStub } = makeSut()
    jest.spyOn(getAccountByTokenUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return success if getAccountByToken return an account', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeRequest())
    expect(response).toEqual(success({ accountId: 'anyId' }))
  })

  test('should return 500 if getAccountByToken throw an error', async () => {
    const { sut, getAccountByTokenUseCaseStub } = makeSut()
    jest.spyOn(getAccountByTokenUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(makeRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
