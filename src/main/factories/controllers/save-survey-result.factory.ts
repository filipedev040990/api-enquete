import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save/save-survey-result.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { makeSaveSurveyResultUseCaseFactory, makeGetSurveyByIdUseCaseFactory } from '@/main/factories/usecases'
import { makeLogDecoratorFactory } from '../decorators'

export const makeSaveSurveyResultController = (): ControllerInterface => {
  const saveSurveyResultController = new SaveSurveyResultController(makeGetSurveyByIdUseCaseFactory(), makeSaveSurveyResultUseCaseFactory())
  return makeLogDecoratorFactory(saveSurveyResultController)
}
