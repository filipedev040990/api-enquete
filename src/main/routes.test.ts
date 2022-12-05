import request from 'supertest'
import { MongoHelper } from '../infra/database/mongodb/helpers/mongo.helper'
import { app } from './app'
import bcrypt from 'bcrypt'
import env from './env'
import { Collection } from 'mongodb'

let accountCollection: Collection
describe('Signup Routes', () => {
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
  describe('Routes', () => {
    describe('Signup', () => {
      test('should return an account on success', async () => {
        await request(app)
          .post('/api/signup')
          .send({
            name: 'Filipe Siqueira',
            email: 'filipe@gmail.com',
            password: '123',
            passwordConfirmation: '123'
          })
          .expect(201)
      })
    })
    describe('Authentication', () => {
      test('should return an token if login succeeds', async () => {
        const password = await bcrypt.hash('123', env.hasher.salt)

        await accountCollection.insertOne({
          name: 'Filipe Siqueira',
          email: 'filipe@gmail.com',
          password
        })

        await request(app)
          .post('/api/authentication')
          .send({
            email: 'filipe@gmail.com',
            password: '123'
          })
          .expect(200)
      })
    })

    describe('404', () => {
      test('should 404', async () => {
        await request(app)
          .post('/api/invalidRoute')
          .expect(404)
      })
    })
  })
})
