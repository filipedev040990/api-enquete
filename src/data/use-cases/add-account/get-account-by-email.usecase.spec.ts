import { GetAccountByEmailUseCase } from './get-account-by-email.usecase'
import { GetAccountByEmailRepositoryInterface } from '../../interfaces/get-account-by-email-repository.interface'
import { AccountModel } from '../../../domain/models/account.model'

type SutType = {
  sut: GetAccountByEmailUseCase
  getAccountByEmailRepository: GetAccountByEmailRepositoryInterface
}

const makeSut = (): SutType => {
  const getAccountByEmailRepository = makeGetAccountByEmailRepositoryStub()
  const sut = new GetAccountByEmailUseCase(getAccountByEmailRepository)
  return { sut, getAccountByEmailRepository }
}

const makeGetAccountByEmailRepositoryStub = (): GetAccountByEmailRepositoryInterface => {
  class GetAccountByEmailRepositoryStub implements GetAccountByEmailRepositoryInterface {
    async getByEmail (email: string): Promise<AccountModel> {
      return await Promise.resolve(fakeAccount)
    }
  }
  return new GetAccountByEmailRepositoryStub()
}

const fakeAccount = {
  id: 'anyId',
  name: 'anyName',
  email: 'anyEmail@email.com',
  password: 'hashedPassword'
}

describe('GetAccountByEmailUseCase', () => {
  test('should call GetAccountByEmailRepository with correct email', async () => {
    const { sut, getAccountByEmailRepository } = makeSut()
    const spy = jest.spyOn(getAccountByEmailRepository, 'getByEmail')
    await sut.execute('anyEmail@email.com')
    expect(spy).toHaveBeenCalledWith('anyEmail@email.com')
  })
  test('should return null if GetAccountByEmailRepository returns null', async () => {
    const { sut, getAccountByEmailRepository } = makeSut()
    jest.spyOn(getAccountByEmailRepository, 'getByEmail').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute('anyEmail@email.com')
    expect(response).toBeNull()
  })
})
