import { AccountRepositoryInterface } from '../../interfaces/account-repository.interface'
import { AccountModel, AddAccountRequest, HasherAdapterInterface } from '.'
import { AddAccountUseCase } from './add-account.usecase'

type SutType = {
  sut: AddAccountUseCase
  hasherStub: HasherAdapterInterface
  accountRepositoryStub: AccountRepositoryInterface
}

const makeSut = (): SutType => {
  const hasherStub = makeHasher()
  const accountRepositoryStub = makeAccountRepositoryStub()
  const sut = new AddAccountUseCase(hasherStub, accountRepositoryStub)
  return { sut, hasherStub, accountRepositoryStub }
}

const makeHasher = (): HasherAdapterInterface => {
  class HasherStub implements HasherAdapterInterface {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashedPassword')
    }
  }
  return new HasherStub()
}

const makeAccountRepositoryStub = (): AccountRepositoryInterface => {
  class AccountRepositoryStub implements AccountRepositoryInterface {
    async create (account: AddAccountRequest): Promise<AccountModel> {
      const fakeAccount = {
        id: 'anyId',
        ...account
      }
      return await Promise.resolve(fakeAccount)
    }
  }
  return new AccountRepositoryStub()
}

let accountData: AddAccountRequest

describe('DbAddAccountUseCase', () => {
  beforeEach(() => {
    accountData = {
      email: 'anyEmail@email.com',
      name: 'AnyName',
      password: 'anyPassword'
    }
  })

  test('should call Hasher.hash with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const spy = jest.spyOn(hasherStub, 'hash')
    await sut.execute(accountData)
    expect(spy).toHaveBeenCalledWith(accountData.password)
  })

  test('should return server error if Hasher.hash throw an exception', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute(accountData)
    await expect(response).rejects.toThrow()
  })

  test('should call AccountRepository with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    const spy = jest.spyOn(accountRepositoryStub, 'create')
    await sut.execute(accountData)
    accountData.password = 'hashedPassword'
    expect(spy).toHaveBeenCalledWith(accountData)
  })

  test('should return an account', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(accountData)
    expect(response).not.toBeNull()
    expect(response).toHaveProperty('id')
    expect(response.email).toBe(accountData.email)
    expect(response.name).toBe(accountData.name)
  })

  test('should return server error if AccountRepository throw an exception', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute(accountData)
    await expect(response).rejects.toThrow()
  })
})
