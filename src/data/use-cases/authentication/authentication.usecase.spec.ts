import { AccountRepositoryInterface } from '../../interfaces/account-repository.interface'
import { AddAccountRequest, AccountModel, HasherAdapterInterface } from '../add-account'
import { AuthenticationUseCase } from './authentication.usecase'

type SutType = {
  sut: AuthenticationUseCase
  accountRepositoryStub: AccountRepositoryInterface
  hasherStub: HasherAdapterInterface
}

const makeSut = (): SutType => {
  const accountRepositoryStub = makeAccountRepositoryStub()
  const hasherStub = makeHasherStub()
  const sut = new AuthenticationUseCase(accountRepositoryStub, hasherStub)
  return { sut, accountRepositoryStub, hasherStub }
}

const makeAccountRepositoryStub = (): AccountRepositoryInterface => {
  class AccountRepositoryStub implements AccountRepositoryInterface {
    async create (accountData: AddAccountRequest): Promise<AccountModel> {
      return null
    }

    async getByEmail (email: string): Promise<AccountModel> {
      const fakeAccount = {
        id: 'anyId',
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'hashedPassword'
      }
      return await Promise.resolve(fakeAccount)
    }
  }
  return new AccountRepositoryStub()
}

const makeHasherStub = (): HasherAdapterInterface => {
  class HasherStub implements HasherAdapterInterface {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashedValue')
    }

    async compare (value: string, valueToCompare: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HasherStub()
}

let accountRequest

describe('AuthenticationUseCase', () => {
  beforeEach(() => {
    accountRequest = {
      email: 'anyEmail@email.com',
      password: 'anyPassword'
    }
  })
  test('should call AccountRepository.getByEmail with correct email', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    const spy = jest.spyOn(accountRepositoryStub, 'getByEmail')
    await sut.execute(accountRequest)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(accountRequest.email)
  })

  test('should return null if AccountRepository.getByEmail returns null', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'getByEmail').mockReturnValueOnce(null)
    const response = await sut.execute(accountRequest)
    expect(response).toBeNull()
  })

  test('should throw if AccountRepository.getByEmail throws', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'getByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute(accountRequest)
    await expect(response).rejects.toThrow()
  })
  test('should call Hasher.compare once and with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    const spy = jest.spyOn(hasherStub, 'compare')
    await sut.execute(accountRequest)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyPassword', 'hashedPassword')
  })
})
