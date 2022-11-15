import { AccountRepositoryInterface } from '../../interfaces/account-repository.interface'
import { AccountModel, AddAccountRequest, EncrypterAdapterInterface } from './'
import { AddAccountUseCase } from './add-account'

type SutType = {
  sut: AddAccountUseCase
  encrypterStub: EncrypterAdapterInterface
  accountRepositoryStub: AccountRepositoryInterface
}

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypter()
  const accountRepositoryStub = makeAccountRepositoryStub()
  const sut = new AddAccountUseCase(encrypterStub, accountRepositoryStub)
  return { sut, encrypterStub, accountRepositoryStub }
}

const makeEncrypter = (): EncrypterAdapterInterface => {
  class EncrypterStub implements EncrypterAdapterInterface {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashedPassword')
    }
  }
  return new EncrypterStub()
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

  test('should call Encrypter.hash with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const spy = jest.spyOn(encrypterStub, 'hash')
    await sut.execute(accountData)
    expect(spy).toHaveBeenCalledWith(accountData.password)
  })

  test('should return server error if Encrypter.hash throw an exception', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'hash').mockImplementationOnce(() => {
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
