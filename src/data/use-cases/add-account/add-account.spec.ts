import { AddAccountRequest, EncrypterAdapterInterface } from './'
import { AddAccountUseCase } from './add-account'

type SutType = {
  sut: AddAccountUseCase
  encrypterStub: EncrypterAdapterInterface
}

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypter()
  const sut = new AddAccountUseCase(encrypterStub)
  return { sut, encrypterStub }
}

const makeEncrypter = (): EncrypterAdapterInterface => {
  class EncrypterStub implements EncrypterAdapterInterface {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashedPassword')
    }
  }
  return new EncrypterStub()
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
})
