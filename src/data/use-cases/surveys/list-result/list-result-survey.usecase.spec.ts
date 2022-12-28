import { ListResultSurveyRepositoryInterface } from '@/data/interfaces/list-result-survey-repository.interface'
import { ListResultSurveyUseCase } from './list-result-survey.usecase'

const fakeResult = {
  surveyId: 'anySurveyId',
  question: 'Você se formou na área de TI ?',
  date: '2022-12-18T00:48:21.098Z',
  answers: [
    {
      answer: 'Não',
      count: 1,
      percent: 100,
      isCurrentAccountAnswer: true
    },
    {
      answer: 'Sim',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    }
  ]
}

type SutType = {
  sut: ListResultSurveyUseCase
  surveyRepositoryStub: ListResultSurveyRepositoryInterface
}
const makeSut = (): SutType => {
  const surveyRepositoryStub = makeSurveyRepositoryStub()
  const sut = new ListResultSurveyUseCase(surveyRepositoryStub)
  return { sut, surveyRepositoryStub }
}

const makeSurveyRepositoryStub = (): ListResultSurveyRepositoryInterface => {
  class SurveyRepositoryStub implements ListResultSurveyRepositoryInterface {
    async getBySurveyIdAndAccountId (surveyId: string, accountId: string): Promise<any> {
      return await Promise.resolve(fakeResult)
    }
  }
  return new SurveyRepositoryStub()
}

describe('ListResultSurveyUseCase', () => {
  test('should call Survey repository once and with correct values', async () => {
    const { sut, surveyRepositoryStub } = makeSut()
    const spy = jest.spyOn(surveyRepositoryStub, 'getBySurveyIdAndAccountId')

    await sut.execute('anySurveyId', 'anyAccountId')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId', 'anyAccountId')
  })
})
