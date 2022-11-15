import { AddAccountRequest } from '../../../domain/use-cases/signup/add-account.interface'
import { EncrypterAdapterInterface } from '../../interfaces/encrypter-adapter.interface'
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
})
