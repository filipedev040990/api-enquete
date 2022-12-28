import { GetSurveyByIdRepositoryInterface } from '@/data/interfaces/get-survey-repository.interface'
import { ListResultSurveyRepositoryInterface } from '@/data/interfaces/list-result-survey-repository.interface'
import { SurveyModel } from '@/domain/models/survey.model'
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

const fakeSurvey: SurveyModel = {
  id: 'anyId',
  question: 'Any question',
  answers: [{
    image: 'any Image',
    answer: 'Any Answer'
  }, {
    image: 'any Image',
    answer: 'Another Answer'
  }],
  date: new Date()
}

type SutType = {
  sut: ListResultSurveyUseCase
  surveyAnswerRepositoryStub: ListResultSurveyRepositoryInterface
  surveyRepositoryStub: GetSurveyByIdRepositoryInterface
}
const makeSut = (): SutType => {
  const surveyAnswerRepositoryStub = makesurveyAnswerRepositoryStub()
  const surveyRepositoryStub = makesurveyRepositoryStub()
  const sut = new ListResultSurveyUseCase(surveyAnswerRepositoryStub, surveyRepositoryStub)
  return { sut, surveyAnswerRepositoryStub, surveyRepositoryStub }
}

const makesurveyAnswerRepositoryStub = (): ListResultSurveyRepositoryInterface => {
  class SurveyAnswerRepositoryStub implements ListResultSurveyRepositoryInterface {
    async getBySurveyIdAndAccountId (surveyId: string, accountId: string): Promise<any> {
      return await Promise.resolve(fakeResult)
    }
  }
  return new SurveyAnswerRepositoryStub()
}

const makesurveyRepositoryStub = (): GetSurveyByIdRepositoryInterface => {
  class SurveyRepositoryStub implements GetSurveyByIdRepositoryInterface {
    async getById (id: string): Promise<SurveyModel> {
      return await Promise.resolve(fakeSurvey)
    }
  }
  return new SurveyRepositoryStub()
}

describe('ListResultSurveyUseCase', () => {
  test('should call SurveyAnswerRepository.getBySurveyIdAndAccountId once and with correct values', async () => {
    const { sut, surveyAnswerRepositoryStub } = makeSut()
    const spy = jest.spyOn(surveyAnswerRepositoryStub, 'getBySurveyIdAndAccountId')

    await sut.execute('anySurveyId', 'anyAccountId')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId', 'anyAccountId')
  })

  test('should return server error if SurveyAnswerRepository.getBySurveyIdAndAccountId throw an exception', async () => {
    const { sut, surveyAnswerRepositoryStub } = makeSut()
    jest.spyOn(surveyAnswerRepositoryStub, 'getBySurveyIdAndAccountId').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = sut.execute('anySurveyId', 'anyAccountId')

    await expect(response).rejects.toThrow()
  })

  test('should return a result on success', async () => {
    const { sut } = makeSut()

    const response = await sut.execute('anySurveyId', 'anyAccountId')

    expect(response).toBeTruthy()
    expect(response).toHaveProperty('surveyId')
    expect(response).toHaveProperty('question')
    expect(response).toHaveProperty('answers')
  })

  test('should call SurveyRepository.getById if is empty answers', async () => {
    const { sut, surveyRepositoryStub, surveyAnswerRepositoryStub } = makeSut()
    const spy = jest.spyOn(surveyRepositoryStub, 'getById')

    jest.spyOn(surveyAnswerRepositoryStub, 'getBySurveyIdAndAccountId').mockReturnValueOnce(Promise.resolve(null))

    await sut.execute('anySurveyId', 'anyAccountId')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId')
  })
})
