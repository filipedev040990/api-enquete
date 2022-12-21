import { ListAllSurveysController } from '@/presentation/controllers/survey/list-all/list-all-surveys.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { makeListAllSurveyUseCaseFactory } from '@/main/factories/usecases'
import { makeLogDecoratorFactory } from '../decorators'

export const makeListAllSurveysController = (): ControllerInterface => {
  const listAllSurveyController = new ListAllSurveysController(makeListAllSurveyUseCaseFactory())
  return makeLogDecoratorFactory(listAllSurveyController)
}
