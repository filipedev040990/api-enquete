import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { HttpRequest } from '@/presentation/interfaces'
import { SaveSurveyResultController } from './save-survey-result.controller'

type SutType = {
  sut: SaveSurveyResultController
  getSurveyByIdUseCaseStub: GetSurveyByIdUseCaseInterface
}

const makeSut = (): SutType => {
  const getSurveyByIdUseCaseStub = makeSurveyByIdUseCaseStub()
  const sut = new SaveSurveyResultController(getSurveyByIdUseCaseStub)
  return { sut, getSurveyByIdUseCaseStub }
}

const makeSurveyByIdUseCaseStub = (): GetSurveyByIdUseCaseInterface => {
  class GetSurveyByIdUseCaseStub implements GetSurveyByIdUseCaseInterface {
    async execute (id: string): Promise<SurveyModel> {
      return await Promise.resolve(makeFakeSurvey())
    }
  }
  return new GetSurveyByIdUseCaseStub()
}

const makeFakeSurvey = (): SurveyModel => ({
  id: 'anySurveyId',
  question: 'Any Question',
  answers: [{
    image: 'anyImage',
    answer: 'Yes'
  }],
  date: new Date()
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'anySurveyId'
  },
  body: {
    accountId: 'anyAccountId',
    answer: 'Any Answer'
  }
})

describe('SaveSurveyResultController', () => {
  test('should call SurveyRepository.getById once and with correct surveyId', async () => {
    const { sut, getSurveyByIdUseCaseStub } = makeSut()
    const spy = jest.spyOn(getSurveyByIdUseCaseStub, 'execute')
    await sut.execute(makeFakeRequest())
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId')
  })
})
