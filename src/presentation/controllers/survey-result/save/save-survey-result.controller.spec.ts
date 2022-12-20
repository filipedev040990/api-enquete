import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http.helper'
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
    answer: 'Yes'
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
})