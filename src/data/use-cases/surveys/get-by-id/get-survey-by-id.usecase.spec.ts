import { GetSurveyByIdRepositoryInterface } from '@/data/interfaces/get-survey-repository.interface'
import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCase } from './get-survey-by-id.usecase'
import MockDate from 'mockdate'

type SutType = {
  sut: GetSurveyByIdUseCase
  surveyRepositoryStub: GetSurveyByIdRepositoryInterface
}

const makeSut = (): SutType => {
  const surveyRepositoryStub = makeSurveyRepositoryStub()
  const sut = new GetSurveyByIdUseCase(surveyRepositoryStub)
  return { sut, surveyRepositoryStub }
}

const makeSurveyRepositoryStub = (): GetSurveyByIdRepositoryInterface => {
  class SurveyRepositoryStub implements GetSurveyByIdRepositoryInterface {
    async getById (): Promise<SurveyModel | null> {
      return await Promise.resolve(makeFakeSurvey())
    }
  }
  return new SurveyRepositoryStub()
}

const makeFakeSurvey = (): SurveyModel => ({
  id: 'anyId',
  question: 'Any Question',
  answers: [
    { answer: 'Any Answer' },
    { answer: 'Another Answer' }
  ],
  date: new Date()
})

describe('GetSurveyByIdUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call SurveyRepository.getById once and with correct survey_id', async () => {
    const { sut, surveyRepositoryStub } = makeSut()
    const spy = jest.spyOn(surveyRepositoryStub, 'getById')
    await sut.execute('anySurveyId')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId')
  })

  test('should return null if SurveyRepository.getById return null', async () => {
    const { sut, surveyRepositoryStub } = makeSut()
    jest.spyOn(surveyRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute('anySurveyId')
    expect(response).toBeNull()
  })

  test('should return an survey on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute('anySurveyId')
    expect(response).toBeTruthy()
    expect(response).toEqual({
      id: 'anyId',
      question: 'Any Question',
      answers: [
        { answer: 'Any Answer' },
        { answer: 'Another Answer' }
      ],
      date: new Date()
    })
  })
})
