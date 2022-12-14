import { ListAllSurveysController } from './list-all-surveys.controller'
import { ListAllSurveysUseCaseInterface } from '../../../../domain/use-cases/survey/list-all-surveys.interface'
import { SurveyModel } from '../../../../domain/models/survey.model'
import { noContent, serverError, success } from '../../../helpers/http.helper'
import MockDate from 'mockdate'

type SutType = {
  sut: ListAllSurveysController
  listAllSurveysUseCaseStub: ListAllSurveysUseCaseInterface
}

const makeSut = (): SutType => {
  const listAllSurveysUseCaseStub = makeListAllSurveysUseCaseStub()
  const sut = new ListAllSurveysController(listAllSurveysUseCaseStub)
  return { sut, listAllSurveysUseCaseStub }
}

const makeListAllSurveysUseCaseStub = (): ListAllSurveysUseCaseInterface => {
  class ListAllSurveysUseCaseStub implements ListAllSurveysUseCaseInterface {
    async execute (): Promise<SurveyModel [] | null> {
      return await Promise.resolve(fakeSurveys)
    }
  }
  return new ListAllSurveysUseCaseStub()
}

const fakeSurveys = [
  {
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
]

describe('ListAllSurveysController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call ListAllSurveysUseCase once', async () => {
    const { sut, listAllSurveysUseCaseStub } = makeSut()
    const spy = jest.spyOn(listAllSurveysUseCaseStub, 'execute')
    await sut.execute({})
    expect(spy).toBeCalledTimes(1)
  })

  test('should return 204 if ListAllSurveysUseCase return null', async () => {
    const { sut, listAllSurveysUseCaseStub } = makeSut()
    jest.spyOn(listAllSurveysUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute({})
    expect(response).toEqual(noContent())
  })

  test('should return all surveys', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({})
    expect(response.body).toBeTruthy()
    expect(response).toEqual(success(fakeSurveys))
  })

  test('should return 500 if ListAllSurveysUseCase throw an exception', async () => {
    const { sut, listAllSurveysUseCaseStub } = makeSut()
    jest.spyOn(listAllSurveysUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute({})
    expect(response).toEqual(serverError(new Error()))
  })
})
