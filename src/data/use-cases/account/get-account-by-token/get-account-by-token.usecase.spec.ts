import { GetAccountByTokenUseCase } from './get-account-by-token.usecase'
import { GetAccountByTokenRepositoryInterface } from '../../../../data/interfaces/get-account-by-token-repository.interface'
import { AccountModel } from '../../../../domain/models/account.model'

type SutType = {
  sut: GetAccountByTokenUseCase
  accountRepositoryStub: GetAccountByTokenRepositoryInterface
}

const makeSut = (): SutType => {
  const accountRepositoryStub = makeGetAccountByTokenRepositoryStub()
  const sut = new GetAccountByTokenUseCase(accountRepositoryStub)
  return { sut, accountRepositoryStub }
}

const makeGetAccountByTokenRepositoryStub = (): GetAccountByTokenRepositoryInterface => {
  class GetAccountByTokenRepositoryStub implements GetAccountByTokenRepositoryInterface {
    async getByToken (token: string): Promise<AccountModel | null> {
      return await Promise.resolve(fakeAccount)
    }
  }
  return new GetAccountByTokenRepositoryStub()
}

const fakeAccount = {
  id: 'anyId',
  name: 'anyName',
  email: 'anyEmail@email.com',
  password: 'hashedPassword'
}

describe('AccountRepository', () => {
  test('should call AccountRepository once and with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    const spy = jest.spyOn(accountRepositoryStub, 'getByToken')
    await sut.execute('anyToken')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyToken')
  })

  test('should return null if AccountRepository return null', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'getByToken').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute('anyToken')
    expect(response).toBeNull()
  })
})
