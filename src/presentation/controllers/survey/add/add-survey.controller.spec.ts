import { ValidationInterface } from '@/presentation/interfaces'
import { AddSurveyController } from './add-survey.controller'
import { badRequest, serverError } from '@/presentation/helpers/http.helper'
import { MissingParamError } from '@/presentation/errors/missing-param.error'
import { AddSurveyUseCaseInterface } from '@/domain/use-cases/survey/add-survey.interface'
import { SurveyModel } from '@/domain/models/survey.model'
import MockDate from 'mockdate'

type SutType = {
  sut: AddSurveyController
  validationStub: ValidationInterface
  addSurveyUseCaseStub: AddSurveyUseCaseInterface
}

const makeSut = (): SutType => {
  const validationStub = makeValidationStub()
  const addSurveyUseCaseStub = makeAddSurveyUseCaseStub()
  const sut = new AddSurveyController(validationStub, addSurveyUseCaseStub)
  return { sut, validationStub, addSurveyUseCaseStub }
}

const makeValidationStub = (): ValidationInterface => {
  class Validation implements ValidationInterface {
    validate (input: any): Error | null {
      return null
    }
  }
  return new Validation()
}

const makeAddSurveyUseCaseStub = (): AddSurveyUseCaseInterface => {
  class AddSurveyUseCaseStub implements AddSurveyUseCaseInterface {
    async execute (survey: SurveyModel): Promise<void> {

    }
  }
  return new AddSurveyUseCaseStub()
}

let request
describe('AddSurveyController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  beforeEach(() => {
    request = {
      body: {
        question: 'anyQuestion',
        answers: [{
          image: '',
          answer: 'anyAnswer'
        }],
        date: new Date()
      }
    }
  })

  test('should call Validations once and with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const spy = jest.spyOn(validationStub, 'validate')
    await sut.execute(request)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(request.body)
  })

  test('should return 400 if Validations fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('anyField'))
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissingParamError('anyField')))
  })

  test('should call AddSurveyUseCase once and with correct values', async () => {
    const { sut, addSurveyUseCaseStub } = makeSut()
    const spy = jest.spyOn(addSurveyUseCaseStub, 'execute')
    await sut.execute(request)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(request.body)
  })

  test('should return 500 if AddSurveyUseCase throw an exception', async () => {
    const { sut, addSurveyUseCaseStub } = makeSut()
    jest.spyOn(addSurveyUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(request)
    expect(response).toEqual(serverError(new Error()))
  })
})
