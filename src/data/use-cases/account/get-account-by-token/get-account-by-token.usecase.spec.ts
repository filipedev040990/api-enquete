import { GetAccountByTokenUseCase } from './get-account-by-token.usecase'
import { GetAccountByTokenRepositoryInterface } from '../../../../data/interfaces/get-account-by-token-repository.interface'
import { AccountModel } from '../../../../domain/models/account.model'
import { DecrypterAdapterInterface } from '../../../interfaces/decrypter.adapter.interface'

type SutType = {
  sut: GetAccountByTokenUseCase
  accountRepositoryStub: GetAccountByTokenRepositoryInterface
  decrypterStub: DecrypterAdapterInterface
}

const makeSut = (): SutType => {
  const accountRepositoryStub = makeGetAccountByTokenRepositoryStub()
  const decrypterStub = makeDecrypterStub()
  const sut = new GetAccountByTokenUseCase(accountRepositoryStub, decrypterStub)
  return { sut, accountRepositoryStub, decrypterStub }
}

const makeGetAccountByTokenRepositoryStub = (): GetAccountByTokenRepositoryInterface => {
  class GetAccountByTokenRepositoryStub implements GetAccountByTokenRepositoryInterface {
    async getByToken (token: string, role?: string): Promise<AccountModel | null> {
      return await Promise.resolve(fakeAccount)
    }
  }
  return new GetAccountByTokenRepositoryStub()
}

const makeDecrypterStub = (): DecrypterAdapterInterface => {
  class DecrypterAdapterStub implements DecrypterAdapterInterface {
    async decrypt (value: string): Promise<string | null> {
      return await Promise.resolve('anyDecryptedToken')
    }
  }
  return new DecrypterAdapterStub()
}

const fakeAccount = {
  id: 'anyId',
  name: 'anyName',
  email: 'anyEmail@email.com',
  password: 'hashedPassword'
}

describe('GetAccountByTokenRepository', () => {
  test('should call Decrypter once and with correct token', async () => {
    const { sut, decrypterStub } = makeSut()
    const spy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.execute('anyToken', 'anyRole')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyToken')
  })

  test('should return null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute('anyToken', 'anyRole')
    expect(response).toBeNull()
  })

  test('should return server error if Decrypter throw an exception', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute('anyToken', 'anyRole')
    await expect(response).rejects.toThrow()
  })

  test('should call AccountRepository once and with correct values', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    const spy = jest.spyOn(accountRepositoryStub, 'getByToken')
    await sut.execute('anyToken', 'anyRole')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyToken', 'anyRole')
  })

  test('should return null if AccountRepository return null', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'getByToken').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute('anyToken', 'anyRole')
    expect(response).toBeNull()
  })

  test('should return an account', async () => {
    const { sut } = makeSut()
    const response = await sut.execute('anyToken', 'anyRole')
    expect(response).toEqual(fakeAccount)
  })

  test('should return server error if AccountRepository throw an exception', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'getByToken').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute('anyToken', 'anyRole')
    await expect(response).rejects.toThrow()
  })
})
