import { AddSurveyUseCase } from './add-survey.usecase'
import { AddSurveyRepositoryInterface } from '../../../data/interfaces/add-survey-repository.interface'
import MockDate from 'mockdate'
import { SurveyModel } from '../../../domain/models/survey.model'

type SutType = {
  sut: AddSurveyUseCase
  surveyRepositoryStub: AddSurveyRepositoryInterface
}

const makeSut = (): SutType => {
  const surveyRepositoryStub = makeSurveyRepositoryStub()
  const sut = new AddSurveyUseCase(surveyRepositoryStub)
  return { sut, surveyRepositoryStub }
}

const makeSurveyRepositoryStub = (): AddSurveyRepositoryInterface => {
  class SurveyRepositoryStub implements AddSurveyRepositoryInterface {
    async create (survey: SurveyModel): Promise<void> {

    }
  }
  return new SurveyRepositoryStub()
}

let request
describe('AddSurveyUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  beforeEach(() => {
    request = {
      question: 'anyQuestion',
      answers: [{
        image: '',
        answer: 'anyAnswer'
      }],
      date: new Date()
    }
  })

  test('should call SurveyRepository once and with correct values', async () => {
    const { sut, surveyRepositoryStub } = makeSut()
    const spy = jest.spyOn(surveyRepositoryStub, 'create')
    await sut.execute(request)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      question: 'anyQuestion',
      answers: [{
        image: '',
        answer: 'anyAnswer'
      }],
      date: new Date()
    })
  })
  test('should throw an exception if SurveyRepository throws', async () => {
    const { sut, surveyRepositoryStub } = makeSut()
    jest.spyOn(surveyRepositoryStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute(request)
    await expect(response).rejects.toThrow()
  })
})
