import { SurveyModel } from '../../../../domain/models/survey.model'
import { ListAllSurveysUseCase } from './list-all-surveys.usecase'
import { ListAllSurveysRepositoryInterface } from '../../../../data/interfaces/list-all-surveys-repository.interface'

const fakeSurveys = [
  {
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
]

type SutType = {
  sut: ListAllSurveysUseCase
  listAllsurveysRepositoryStub: ListAllSurveysRepositoryInterface
}

const makeSut = (): SutType => {
  const listAllsurveysRepositoryStub = makeListAllsurveysRepositoryStub()
  const sut = new ListAllSurveysUseCase(listAllsurveysRepositoryStub)
  return { sut, listAllsurveysRepositoryStub }
}

const makeListAllsurveysRepositoryStub = (): ListAllSurveysRepositoryInterface => {
  class ListAllsurveysRepositoryStub implements ListAllSurveysRepositoryInterface {
    async listAll (): Promise<SurveyModel [] | null> {
      return await Promise.resolve(fakeSurveys)
    }
  }
  return new ListAllsurveysRepositoryStub()
}

describe('ListAllSurveysUseCase', () => {
  test('should call SurveyRepository.listAll once', async () => {
    const { sut, listAllsurveysRepositoryStub } = makeSut()
    const spy = jest.spyOn(listAllsurveysRepositoryStub, 'listAll')
    await sut.execute()
    expect(spy).toBeCalledTimes(1)
  })

  test('should return null if SurveyRepository.listAll returns null', async () => {
    const { sut, listAllsurveysRepositoryStub } = makeSut()
    jest.spyOn(listAllsurveysRepositoryStub, 'listAll').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute()
    expect(response).toBeNull()
  })

  test('should return all surveys', async () => {
    const { sut } = makeSut()
    const response = await sut.execute()
    expect(response).toBeTruthy()
    expect(response).toEqual(fakeSurveys)
  })

  test('should return server error if SurveyRepository.listAll throw an exception', async () => {
    const { sut, listAllsurveysRepositoryStub } = makeSut()
    jest.spyOn(listAllsurveysRepositoryStub, 'listAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute()
    await expect(response).rejects.toThrow()
  })
})
