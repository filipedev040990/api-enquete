import { MongoHelper as sut } from './mongo.helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let collection = await sut.getCollection('accounts')
    expect(collection).toBeTruthy()
    await sut.disconnect()
    collection = await sut.getCollection('accounts')
    expect(collection).toBeTruthy()
  })
})
