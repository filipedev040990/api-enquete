import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http.helper'
import { HttpRequest } from '@/presentation/interfaces'
import { ListSurveyResultController } from './list-survey-result.controller'

type SutType = {
  sut: ListSurveyResultController
  listResultSurveyUseCaseStub: ListResultSurveyUseCaseInterface
  getSurveyById: GetSurveyByIdUseCaseInterface
}

const makeSut = (): SutType => {
  const listResultSurveyUseCaseStub = makeListResultSurveyUseCaseStub()
  const getSurveyById = makeGetSurveyByIdUseCaseStub()
  const sut = new ListSurveyResultController(listResultSurveyUseCaseStub, getSurveyById)
  return { sut, listResultSurveyUseCaseStub, getSurveyById }
}

const makeListResultSurveyUseCaseStub = (): ListResultSurveyUseCaseInterface => {
  class ListResultSurveyUseCaseStub implements ListResultSurveyUseCaseInterface {
    async execute (surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(fakeResult)
    }
  }
  return new ListResultSurveyUseCaseStub()
}

const makeGetSurveyByIdUseCaseStub = (): GetSurveyByIdUseCaseInterface => {
  class GetSurveyByIdUseCaseStub implements GetSurveyByIdUseCaseInterface {
    async execute (id: string): Promise<SurveyModel> {
      return await Promise.resolve(fakeSurvey)
    }
  }
  return new GetSurveyByIdUseCaseStub()
}

const fakeSurvey = {
  id: 'anyId',
  question: 'Question 01',
  answers: [
    {
      answer: 'Answer 01'
    },
    {
      answer: 'Answer 02'
    }
  ],
  date: new Date()
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

  test('should return survey result on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeFakeRequest())

    expect(response).toBeTruthy()
    expect(response).toEqual(success(fakeResult))
  })

  test('should return 400 if invalid survey_id is provided', async () => {
    const { sut, getSurveyById } = makeSut()
    jest.spyOn(getSurveyById, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute(makeFakeRequest())

    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if ListResultSurveyUseCase throw an exception', async () => {
    const { sut, listResultSurveyUseCaseStub } = makeSut()
    jest.spyOn(listResultSurveyUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(makeFakeRequest())

    expect(response).toEqual(serverError(new Error()))
  })
})
