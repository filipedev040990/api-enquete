import { GetSurveyByIdRepositoryInterface } from '@/data/interfaces/get-survey-repository.interface'
import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCase } from './get-survey-by-id.usecase'

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
  test('should call SurveyRepository.getById once and with correct survey_id', async () => {
    const { sut, surveyRepositoryStub } = makeSut()
    const spy = jest.spyOn(surveyRepositoryStub, 'getById')
    await sut.execute('anySurveyId')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId')
  })
})
