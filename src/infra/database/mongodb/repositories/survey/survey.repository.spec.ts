import { SurveyRepository } from './survey.repository'
import { MongoHelper } from '../../helpers/mongo.helper'

 type SutType = {
   sut: SurveyRepository
 }

const makeSut = (): SutType => {
  const sut = new SurveyRepository()
  return { sut }
}
let SurveyCollection
describe('Survey Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    SurveyCollection = await MongoHelper.getCollection('surveys')
    await SurveyCollection.deleteMany({})
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

      const question = await SurveyCollection.findOne({ question: 'Question Example' })
      expect(question).toBeTruthy()
    })
  })
})
