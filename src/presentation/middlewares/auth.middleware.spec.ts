import { AuthMIddleware } from './auth.middleware'
import { forbidden } from '../helpers/http.helper'
import { AccessDeniedError } from '../errors/access-denied.error'
import { HttpRequest } from '../interfaces'
import { AccountModel } from '../../domain/models/account.model'
import { GetAccountByTokenUseCaseInterface } from '../../domain/use-cases/account/get-account-by-token.interface'

type SutType = {
  sut: AuthMIddleware
  getAccountByTokenUseCaseStub: GetAccountByTokenUseCaseInterface
}

const makeSut = (): SutType => {
  const getAccountByTokenUseCaseStub = makeGetAccountByTokenUseCaseStub()
  const sut = new AuthMIddleware(getAccountByTokenUseCaseStub)
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
    const { sut, getAccountByTokenUseCaseStub } = makeSut()
    const spy = jest.spyOn(getAccountByTokenUseCaseStub, 'execute')
    await sut.execute(makeRequest())
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyToken')
  })

  test('should return 403 if getAccountByToken return null', async () => {
    const { sut, getAccountByTokenUseCaseStub } = makeSut()
    jest.spyOn(getAccountByTokenUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })
})
