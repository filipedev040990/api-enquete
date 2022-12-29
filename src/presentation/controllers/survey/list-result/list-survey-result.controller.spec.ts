import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http.helper'
import { HttpRequest } from '@/presentation/interfaces'
import { ListSurveyResultController } from './list-survey-result.controller'

type SutType = {
  sut: ListSurveyResultController
  listResultSurveyUseCaseStub: ListResultSurveyUseCaseInterface
}

const makeSut = (): SutType => {
  const listResultSurveyUseCaseStub = makeListResultSurveyUseCaseStub()
  const sut = new ListSurveyResultController(listResultSurveyUseCaseStub)
  return { sut, listResultSurveyUseCaseStub }
}

const makeListResultSurveyUseCaseStub = (): ListResultSurveyUseCaseInterface => {
  class ListResultSurveyUseCaseStub implements ListResultSurveyUseCaseInterface {
    async execute (surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(fakeResult)
    }
  }
  return new ListResultSurveyUseCaseStub()
}

const fakeResult = {
  surveyId: 'anySurveyId',
  question: 'Você se formou na área de TI ?',
  date: new Date('2022-12-18'),
  answers: [
    {
      answer: 'Não',
      count: 1,
      percent: 100
    },
    {
      answer: 'Sim',
      count: 0,
      percent: 0
    }
  ]
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'anySurveyId'
  },
  accountId: 'anyAccountId'
})

describe('ListSurveyResultController', () => {
  test('should call ListResultSurveyUseCase once and with correct values', async () => {
    const { sut, listResultSurveyUseCaseStub } = makeSut()
    const spy = jest.spyOn(listResultSurveyUseCaseStub, 'execute')
    await sut.execute(makeFakeRequest())

    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId', 'anyAccountId')
  })

  test('should return 400 if surveyId is not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.params = {}
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissingParamError('surveyId')))
  })
})
