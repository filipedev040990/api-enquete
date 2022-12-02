import { TokenRepository } from './token.repository'
import { MongoHelper } from '../helpers/mongo.helper'
import { Collection } from 'mongodb'

const makeSut = (): TokenRepository => {
  return new TokenRepository()
}
let tokenCollection: Collection
describe('TokenRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    tokenCollection = await MongoHelper.getCollection('token')
    await tokenCollection.deleteMany({})
  })

  test('should create an token', async () => {
    const sut = makeSut()
    let countToken
    countToken = await tokenCollection.countDocuments()
    expect(countToken).toBe(0)

    await sut.createOrUpdate({
      account_id: 'anyAccountId',
      token: 'anyToken'
    })

    countToken = await tokenCollection.countDocuments()
    expect(countToken).toBe(1)
    const token = await tokenCollection.findOne({ account_id: 'anyAccountId' })
    expect(token).toBeTruthy()
    expect(token.token).toBe('anyToken')
  })

  test('should update an token if exists', async () => {
    const sut = makeSut()
    let countToken

    countToken = await tokenCollection.countDocuments()
    expect(countToken).toBe(0)

    await tokenCollection.insertOne({
      account_id: 'anyAccountId',
      token: 'anyToken'
    })

    countToken = await tokenCollection.countDocuments()
    expect(countToken).toBe(1)

    await sut.createOrUpdate({
      account_id: 'anyAccountId',
      token: 'anotherToken'
    })

    countToken = await tokenCollection.countDocuments()
    expect(countToken).toBe(1)
    const token = await tokenCollection.findOne({ account_id: 'anyAccountId' })
    expect(token).toBeTruthy()
    expect(token.token).toBe('anotherToken')
  })
})
