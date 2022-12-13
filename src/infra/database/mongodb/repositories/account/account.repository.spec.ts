import { AccountRepository } from './account.repository'
import { MongoHelper } from '../../helpers/mongo.helper'

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

    test('should return null if AccountRepository returns null', async () => {
      const { sut } = makeSut()
      const response = await sut.getByEmail('anyEmail@email.com')
      expect(response).toBeNull()
    })
  })

  describe('getByToken', () => {
    test('should return an account without role', async () => {
      const { sut } = makeSut()

      await accountCollection.insertOne({
        name: 'anyname',
        email: 'anyEmail@email.com',
        password: 'hashedPassword',
        token: 'anyToken'
      })

      const response = await sut.getByToken('anyToken')

      expect(response).toBeTruthy()
      expect(response.name).toBe('anyname')
      expect(response.email).toBe('anyEmail@email.com')
      expect(response.password).toBe('hashedPassword')
      expect(response.token).toBe('anyToken')
    })

    test('should return an account on getByToken with role', async () => {
      const { sut } = makeSut()

      await accountCollection.insertOne({
        name: 'anyname',
        email: 'anyEmail@email.com',
        password: 'hashedPassword',
        token: 'anyToken',
        role: 'admin'
      })

      const response = await sut.getByToken('anyToken', 'admin')

      expect(response).toBeTruthy()
      expect(response.name).toBe('anyname')
      expect(response.email).toBe('anyEmail@email.com')
      expect(response.password).toBe('hashedPassword')
      expect(response.token).toBe('anyToken')
    })

    test('should return null on getByToken with invalid role', async () => {
      const { sut } = makeSut()

      await accountCollection.insertOne({
        name: 'anyname',
        email: 'anyEmail@email.com',
        password: 'hashedPassword',
        token: 'anyToken'
      })

      const response = await sut.getByToken('anyToken', 'admin')

      expect(response).toBeNull()
    })

    test('should return an account on getByToken if user is admin', async () => {
      const { sut } = makeSut()

      await accountCollection.insertOne({
        name: 'anyname',
        email: 'anyEmail@email.com',
        password: 'hashedPassword',
        token: 'anyToken',
        role: 'admin'
      })

      const response = await sut.getByToken('anyToken')

      expect(response).toBeTruthy()
      expect(response.name).toBe('anyname')
      expect(response.email).toBe('anyEmail@email.com')
      expect(response.password).toBe('hashedPassword')
      expect(response.token).toBe('anyToken')
    })

    test('should return null if AccountRepository returns null', async () => {
      const { sut } = makeSut()
      const response = await sut.getByEmail('anyToken')
      expect(response).toBeNull()
    })
  })
})
