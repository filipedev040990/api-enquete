import request from 'supertest'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { app } from './app'
import bcrypt from 'bcrypt'
import env from './env'
import { Collection } from 'mongodb'

let accountCollection: Collection
let surveyCollection: Collection

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

    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
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

    describe('survey', () => {
      test('should return 403 on add survey without token', async () => {
        await request(app)
          .post('/api/surveys')
          .send({
            question: 'Question Test',
            answers: [
              {
                answer: 'Answer 1',
                image: 'imageTest'
              },
              {
                answer: 'Answer 2'
              }
            ]
          })
          .expect(403)
      })

      test('should return 403 on list all survey without token', async () => {
        await request(app)
          .get('/api/surveys')
          .expect(403)
      })
    })

    describe('survey answer', () => {
      test('should return 403 on save survey answer without token', async () => {
        await request(app)
          .put('/api/surveys/anyId/save-answer')
          .send({
            answer: 'anyAnswer'
          })
          .expect(403)
      })
    })

    describe('survey result', () => {
      test('should return 403 on list survey result without token', async () => {
        await request(app)
          .get('/api/surveys/anyId/results')
          .expect(403)
      })
    })
  })
})
