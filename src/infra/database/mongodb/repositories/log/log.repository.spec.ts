import { LogRepository } from './log.repository'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { Collection } from 'mongodb'

 type SutType = {
   sut: LogRepository
 }

const makeSut = (): SutType => {
  const sut = new LogRepository()
  return { sut }
}

describe('LogRepository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const { sut } = makeSut()
    await sut.logError('anyError')
    const countError = await errorCollection.countDocuments()
    expect(countError).toBe(1)
  })
})
