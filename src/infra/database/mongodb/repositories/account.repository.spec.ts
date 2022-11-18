import { AccountRepository } from './account.repository'
import { MongoHelper } from '../helpers/mongo.helper'

 type SutType = {
   sut: AccountRepository
 }

const makeSut = (): SutType => {
  const sut = new AccountRepository()
  return { sut }
}

describe('', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const response = await sut.create({
      name: 'anyname',
      email: 'anyEmail@email.com',
      password: 'hashedPassword'
    })

    expect(response).toBeTruthy()
  })
})
