import { GetSurveyByIdUseCase } from '@/data/use-cases/surveys/get-by-id/get-survey-by-id.usecase'
import { ListResultSurveyUseCase } from '@/data/use-cases/surveys/list-result/list-result-survey.usecase'
import { SurveyAnswerRepository } from '@/infra/database/mongodb/repositories/survey-answer/survey-answer.repository'
import { SurveyRepository } from '@/infra/database/mongodb/repositories/survey/survey.repository'
import { ListSurveyResultController } from '@/presentation/controllers/survey/list-result/list-survey-result.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { makeLogDecoratorFactory } from '../decorators'

export const makeListSurveyResultController = (): ControllerInterface => {
  const listSurveyResultRepository = new SurveyAnswerRepository()
  const getSurveyByIdRepository = new SurveyRepository()
  const listResultSurveyUseCase = new ListResultSurveyUseCase(listSurveyResultRepository, getSurveyByIdRepository)
  const getSurveyByIdUseCase = new GetSurveyByIdUseCase(getSurveyByIdRepository)
  const listSurveyResultController = new ListSurveyResultController(listResultSurveyUseCase, getSurveyByIdUseCase)
  return makeLogDecoratorFactory(listSurveyResultController)
}
