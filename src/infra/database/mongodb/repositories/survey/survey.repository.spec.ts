import { SurveyRepository } from './survey.repository'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'

 type SutType = {
   sut: SurveyRepository
 }

const makeSut = (): SutType => {
  const sut = new SurveyRepository()
  return { sut }
}
let surveyCollection
describe('Survey Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('create', () => {
    test('should create an survey', async () => {
      const { sut } = makeSut()
      await sut.create({
        question: 'Question Example',
        answers: [
          {
            image: 'anyImage',
            answer: 'any Answer'
          },
          {
            answer: 'Another Answer'
          }
        ],
        date: new Date()
      })

      const question = await surveyCollection.findOne({ question: 'Question Example' })
      expect(question).toBeTruthy()
    })
  })

  describe('listAll', () => {
    test('should list all surveys', async () => {
      const { sut } = makeSut()

      await surveyCollection.insertMany([{
        question: 'Question Example',
        answers: [
          {
            image: 'anyImage',
            answer: 'any Answer'
          },
          {
            answer: 'Another Answer'
          }
        ],
        date: new Date()
      }, {
        question: 'Question Example 2',
        answers: [
          {
            image: 'anyImage',
            answer: 'any Answer'
          },
          {
            answer: 'Another Answer'
          }
        ],
        date: new Date()
      }])

      const response = await sut.listAll()
      expect(response.length).toBe(2)
      expect(response[0].id).toBeTruthy()
      expect(response[0].question).toBe('Question Example')
      expect(response[1].question).toBe('Question Example 2')
    })
  })

  describe('getById', () => {
    test('should list survey by id', async () => {
      const { sut } = makeSut()

      const surveyResult = await surveyCollection.insertOne({
        question: 'Question Example',
        answers: [
          {
            answer: 'Yes'
          },
          {
            answer: 'No'
          }
        ],
        date: new Date()
      })
      const response = await sut.getById(surveyResult.insertedId)
      expect(response).toBeTruthy()
      expect(response.id).toBeTruthy()
    })
  })
})
