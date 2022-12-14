import { ListAllSurveysController } from './list-all-surveys.controller'
import { ListAllSurveysUseCaseInterface } from '../../../../domain/use-cases/survey/list-all-surveys.interface'
import { SurveyModel } from '../../../../domain/models/survey.model'

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
  test('should call ListAllSurveysUseCase once', async () => {
    const { sut, listAllSurveysUseCaseStub } = makeSut()
    const spy = jest.spyOn(listAllSurveysUseCaseStub, 'execute')
    await sut.execute({})
    expect(spy).toBeCalledTimes(1)
  })
})