import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http.helper'
import { HttpRequest } from '@/presentation/interfaces'
import { SaveSurveyAnswerController } from './save-survey-answer.controller'
import MockDate from 'mockdate'
import { SaveSurveyAnswerModel, SaveSurveyAnswerUseCaseInterface } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'

type SutType = {
  sut: SaveSurveyAnswerController
  getSurveyByIdUseCaseStub: GetSurveyByIdUseCaseInterface
  saveSurveyAnswerUseCaseStub: SaveSurveyAnswerUseCaseInterface
}

const makeSut = (): SutType => {
  const getSurveyByIdUseCaseStub = makeSurveyByIdUseCaseStub()
  const saveSurveyAnswerUseCaseStub = makesaveSurveyAnswerUseCaseStub()
  const sut = new SaveSurveyAnswerController(getSurveyByIdUseCaseStub, saveSurveyAnswerUseCaseStub)
  return { sut, getSurveyByIdUseCaseStub, saveSurveyAnswerUseCaseStub }
}

const makeSurveyByIdUseCaseStub = (): GetSurveyByIdUseCaseInterface => {
  class GetSurveyByIdUseCaseStub implements GetSurveyByIdUseCaseInterface {
    async execute (id: string): Promise<SurveyModel> {
      return await Promise.resolve(makeFakeSurvey())
    }
  }
  return new GetSurveyByIdUseCaseStub()
}

const makesaveSurveyAnswerUseCaseStub = (): SaveSurveyAnswerUseCaseInterface => {
  class SaveSurveyAnswerUseCaseStub implements SaveSurveyAnswerUseCaseInterface {
    async execute (data: SaveSurveyAnswerModel): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResult())
    }
  }
  return new SaveSurveyAnswerUseCaseStub()
}

const makeFakeSurveyResult = (): SurveyResultModel => ({
  surveyId: 'anySurveyId',
  question: 'Any Question',
  answers: [
    {
      answer: 'Any Answer',
      count: 1,
      percent: 50
    }
  ],
  date: new Date()
})

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
    answer: 'Yes'
  },
  accountId: 'anyAccountId'
})

describe('saveSurveyAnswerController', () => {
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

  test('should call saveSurveyAnswerUseCase once and with correct values', async () => {
    const { sut, saveSurveyAnswerUseCaseStub } = makeSut()
    const spy = jest.spyOn(saveSurveyAnswerUseCaseStub, 'execute')
    await sut.execute(makeFakeRequest())
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      surveyId: 'anySurveyId',
      accountId: 'anyAccountId',
      date: new Date(),
      answer: 'Yes'
    })
  })

  test('should return 500 if SurveyRepository.getById throw an exception', async () => {
    const { sut, saveSurveyAnswerUseCaseStub } = makeSut()
    jest.spyOn(saveSurveyAnswerUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(makeFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeFakeRequest())
    expect(response).toEqual(success(makeFakeSurveyResult()))
  })
})
