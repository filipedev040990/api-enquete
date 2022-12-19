import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResultUseCase } from './save-survey-result.usecase'
import MockDate from 'mockdate'
import { SaveSurveyResultRepositoryInterface } from '@/data/interfaces/save-survey-result-repository.interface'
import { SaveSurveyResultModel } from '@/domain/use-cases/survey/save-survey-result.interface'

type SutType = {
  sut: SaveSurveyResultUseCase
  surveyResultRepositoryStub: SaveSurveyResultRepositoryInterface
}

const makeSut = (): SutType => {
  const surveyResultRepositoryStub = makeSurveyResultRepositoryStub()
  const sut = new SaveSurveyResultUseCase(surveyResultRepositoryStub)
  return { sut, surveyResultRepositoryStub }
}

const makeSurveyResultRepositoryStub = (): SaveSurveyResultRepositoryInterface => {
  class SurveyResultRepositoryStub implements SaveSurveyResultRepositoryInterface {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      const fakeSurveyResult = makeFakeSurveyResult()
      return await Promise.resolve({
        id: 'anyId',
        ...fakeSurveyResult
      })
    }
  }
  return new SurveyResultRepositoryStub()
}

const makeFakeSurveyResult = (): SaveSurveyResultModel => ({
  surveyId: 'anySurveyId',
  accountId: 'anyAccountId',
  answer: 'Any Answer',
  date: new Date()
})

describe('SaveSurveyResultUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call SurveyResultRepository.save once and with correct values', async () => {
    const { sut, surveyResultRepositoryStub } = makeSut()
    const spy = jest.spyOn(surveyResultRepositoryStub, 'save')
    const fakeSurveyResult = makeFakeSurveyResult()
    await sut.execute(fakeSurveyResult)
    expect(spy).toHaveBeenCalledWith(fakeSurveyResult)
  })
})
