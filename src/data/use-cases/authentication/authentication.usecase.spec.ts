import { AccountModel } from '../../../domain/models/account.model'
import { AddAccountRequest } from '../../../domain/use-cases/signup/add-account.interface'
import { AccountRepositoryInterface, EncrypterAdapterInterface, TokenRepositoryInterface, TokenRepositoryProps, HasherCompareAdapterInterface } from './'
import { AuthenticationUseCase } from './authentication.usecase'

type SutType = {
  sut: AuthenticationUseCase
  accountRepositoryStub: AccountRepositoryInterface
  hasherStub: HasherCompareAdapterInterface
  encrypterStub: EncrypterAdapterInterface
  tokenRepositoryStub: TokenRepositoryInterface
}

const makeSut = (): SutType => {
  const accountRepositoryStub = makeAccountRepositoryStub()
  const hasherStub = makeHasherStub()
  const encrypterStub = makeEncrypterStub()
  const tokenRepositoryStub = makeTokenRepositoryStub()
  const sut = new AuthenticationUseCase(accountRepositoryStub, hasherStub, encrypterStub, tokenRepositoryStub)
  return { sut, accountRepositoryStub, hasherStub, encrypterStub, tokenRepositoryStub }
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

const makeHasherStub = (): HasherCompareAdapterInterface => {
  class HasherStub implements HasherCompareAdapterInterface {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashedValue')
    }

    async compare (value: string, valueToCompare: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HasherStub()
}

const makeEncrypterStub = (): EncrypterAdapterInterface => {
  class EncrypterStub implements EncrypterAdapterInterface {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('anyToken')
    }
  }
  return new EncrypterStub()
}
const makeTokenRepositoryStub = (): TokenRepositoryInterface => {
  class TokenRepositoryStub implements TokenRepositoryInterface {
    async createOrUpdate (props: TokenRepositoryProps): Promise<void> {
      return null
    }
  }
  return new TokenRepositoryStub()
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

  test('should return null if Hasher.compare return false', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.execute(accountRequest)
    expect(response).toBeNull()
  })

  test('should call Encrypter.encrypt once and with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const spy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.execute(accountRequest)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyId')
  })

  test('should call TokenRepository once and with correct values', async () => {
    const { sut, tokenRepositoryStub } = makeSut()
    const spy = jest.spyOn(tokenRepositoryStub, 'createOrUpdate')
    await sut.execute(accountRequest)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      account_id: 'anyId',
      token: 'anyToken'
    })
  })

  test('should throw if TokenRepository throws', async () => {
    const { sut, tokenRepositoryStub } = makeSut()
    jest.spyOn(tokenRepositoryStub, 'createOrUpdate').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute(accountRequest)
    await expect(response).rejects.toThrow()
  })

  test('should return an token on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(accountRequest)
    await expect(response).toBe('anyToken')
  })
})
