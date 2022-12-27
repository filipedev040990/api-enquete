import { SaveSurveyAnswerUseCase } from './save-survey-answer.usecase'
import MockDate from 'mockdate'
import { SaveSurveyAnswerRepositoryInterface } from '@/data/interfaces/save-survey-answer-repository.interface'
import { SaveSurveyAnswerModel } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'

type SutType = {
  sut: SaveSurveyAnswerUseCase
  SurveyAnswerRepositoryStub: SaveSurveyAnswerRepositoryInterface
}

const makeSut = (): SutType => {
  const SurveyAnswerRepositoryStub = makeSurveyAnswerRepositoryStub()
  const sut = new SaveSurveyAnswerUseCase(SurveyAnswerRepositoryStub)
  return { sut, SurveyAnswerRepositoryStub }
}

const makeSurveyAnswerRepositoryStub = (): SaveSurveyAnswerRepositoryInterface => {
  class SurveyAnswerRepositoryStub implements SaveSurveyAnswerRepositoryInterface {
    async save (data: SaveSurveyAnswerModel): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResult())
    }
  }
  return new SurveyAnswerRepositoryStub()
}

const makeFakeSurveyResult = (): SurveyResultModel => ({
  surveyId: 'anySurveyId',
  question: 'Any Question',
  answers: [
    {
      answer: 'Any Answer',
      count: 1,
      percent: 50
    }
  ],
  date: new Date()
})

const makeFakesurveyAnswer = (): SaveSurveyAnswerModel => ({
  surveyId: 'anySurveyId',
  accountId: 'anyAccountId',
  answer: 'Any Answer',
  date: new Date()
})

describe('saveSurveyAnswerUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should call SurveyAnswerRepository.save once and with correct values', async () => {
    const { sut, SurveyAnswerRepositoryStub } = makeSut()
    const spy = jest.spyOn(SurveyAnswerRepositoryStub, 'save')
    const fakesurveyAnswer = makeFakesurveyAnswer()
    await sut.execute(fakesurveyAnswer)
    expect(spy).toHaveBeenCalledWith(fakesurveyAnswer)
  })

  test('should return surveyAnswer on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeFakesurveyAnswer())
    expect(response).toEqual(makeFakeSurveyResult())
  })

  test('should return server error if SurveyAnswerRepository.save throw an exception', async () => {
    const { sut, SurveyAnswerRepositoryStub } = makeSut()
    jest.spyOn(SurveyAnswerRepositoryStub, 'save').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute(makeFakesurveyAnswer())
    await expect(response).rejects.toThrow()
  })
})
