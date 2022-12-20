import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { SaveSurveyResultModel, SaveSurveyResultUseCaseInterface } from '@/domain/use-cases/survey/save-survey-result.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http.helper'
import { HttpRequest } from '@/presentation/interfaces'
import { SaveSurveyResultController } from './save-survey-result.controller'
import MockDate from 'mockdate'

type SutType = {
  sut: SaveSurveyResultController
  getSurveyByIdUseCaseStub: GetSurveyByIdUseCaseInterface
  saveSurveyResultUseCaseStub: SaveSurveyResultUseCaseInterface
}

const makeSut = (): SutType => {
  const getSurveyByIdUseCaseStub = makeSurveyByIdUseCaseStub()
  const saveSurveyResultUseCaseStub = makeSaveSurveyResultUseCaseStub()
  const sut = new SaveSurveyResultController(getSurveyByIdUseCaseStub, saveSurveyResultUseCaseStub)
  return { sut, getSurveyByIdUseCaseStub, saveSurveyResultUseCaseStub }
}

const makeSurveyByIdUseCaseStub = (): GetSurveyByIdUseCaseInterface => {
  class GetSurveyByIdUseCaseStub implements GetSurveyByIdUseCaseInterface {
    async execute (id: string): Promise<SurveyModel> {
      return await Promise.resolve(makeFakeSurvey())
    }
  }
  return new GetSurveyByIdUseCaseStub()
}

const makeSaveSurveyResultUseCaseStub = (): SaveSurveyResultUseCaseInterface => {
  class SaveSurveyResultUseCaseStub implements SaveSurveyResultUseCaseInterface {
    async execute (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResult())
    }
  }
  return new SaveSurveyResultUseCaseStub()
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

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'anyId',
  surveyId: 'anySurveyId',
  accountId: 'anyAccountId',
  answer: 'Yes',
  date: new Date()
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'anySurveyId'
  },
  body: {
    accountId: 'anyAccountId',
    answer: 'Yes'
  },
  accountId: 'anyAccountId'
})

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call SurveyRepository.getById once and with correct surveyId', async () => {
    const { sut, getSurveyByIdUseCaseStub } = makeSut()
    const spy = jest.spyOn(getSurveyByIdUseCaseStub, 'execute')
    await sut.execute(makeFakeRequest())
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anySurveyId')
  })

  test('should return 403 if SurveyRepository.getById return null', async () => {
    const { sut, getSurveyByIdUseCaseStub } = makeSut()
    jest.spyOn(getSurveyByIdUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.execute(makeFakeRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('survey_id')))
  })

  test('should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()
    fakeRequest.body.answer = 'invalidAnswer'
    const response = await sut.execute(fakeRequest)
    expect(response).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('should return 500 if SurveyRepository.getById throw an exception', async () => {
    const { sut, getSurveyByIdUseCaseStub } = makeSut()
    jest.spyOn(getSurveyByIdUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(makeFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call SaveSurveyResultUseCase once and with correct values', async () => {
    const { sut, saveSurveyResultUseCaseStub } = makeSut()
    const spy = jest.spyOn(saveSurveyResultUseCaseStub, 'execute')
    await sut.execute(makeFakeRequest())
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      surveyId: 'anySurveyId',
      accountId: 'anyAccountId',
      date: new Date(),
      answer: 'Yes'
    })
  })
})
