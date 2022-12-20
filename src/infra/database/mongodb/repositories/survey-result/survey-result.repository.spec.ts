import { AccountModel } from '@/domain/models/account.model'
import { SurveyModel } from '@/domain/models/survey.model'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { map } from '../../helpers/mapping.helper'
import { SurveyResultRepository } from './survey-result.repository'

type SutType = {
  sut: SurveyResultRepository
}

let surveyResultCollection
let accountCollection
let surveyCollection

const makeSut = (): SutType => {
  const sut = new SurveyResultRepository()
  return { sut }
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const surveyId = await surveyCollection.insertOne({
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

  const survey = await surveyCollection.findOne({ _id: surveyId.insertedId })
  return map(survey)
}

const makeAccount = async (): Promise<AccountModel> => {
  const accountId = await accountCollection.insertOne({
    name: 'anyname',
    email: 'anyEmail@email.com',
    password: 'hashedPassword'
  })

  const account = await accountCollection.findOne({ _id: accountId.insertedId })
  return map(account)
}

describe('SurveyResultRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})

    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  describe('save', () => {
    test('should add a survey result if its new', async () => {
      const { sut } = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toEqual(survey.answers[0].answer)
    })
  })
})
