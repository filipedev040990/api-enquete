import { AccountRepository } from './account.repository'
import { MongoHelper } from '../helpers/mongo.helper'

 type SutType = {
   sut: AccountRepository
 }

const makeSut = (): SutType => {
  const sut = new AccountRepository()
  return { sut }
}
let accountCollection
describe('Account Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('create', () => {
    test('should return an account on success', async () => {
      const { sut } = makeSut()
      const response = await sut.create({
        name: 'anyname',
        email: 'anyEmail@email.com',
        password: 'hashedPassword'
      })

      expect(response).toBeTruthy()
      expect(response.name).toBe('anyname')
      expect(response.email).toBe('anyEmail@email.com')
      expect(response.password).toBe('hashedPassword')
    })
  })

  describe('getByEmail', () => {
    test('should return an account if email exists', async () => {
      const { sut } = makeSut()

      await accountCollection.insertOne({
        name: 'anyname',
        email: 'anyEmail@email.com',
        password: 'hashedPassword'
      })

      const response = await sut.getByEmail('anyEmail@email.com')

      expect(response).toBeTruthy()
      expect(response.name).toBe('anyname')
      expect(response.email).toBe('anyEmail@email.com')
      expect(response.password).toBe('hashedPassword')
    })
  })
})
