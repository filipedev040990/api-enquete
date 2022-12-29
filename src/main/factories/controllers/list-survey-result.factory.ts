import { ListSurveyResultController } from '@/presentation/controllers/survey/list-result/list-survey-result.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { makeLogDecoratorFactory } from '../decorators'
import { makeListSurveyResultUseCaseFactory } from '../usecases/list-survey-result-usecase.factory'

export const makeListSurveyResultController = (): ControllerInterface => {
  const listSurveyResultController = new ListSurveyResultController(makeListSurveyResultUseCaseFactory())
  return makeLogDecoratorFactory(listSurveyResultController)
}
