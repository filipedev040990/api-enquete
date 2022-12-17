import { ListAllSurveysUseCase } from '@/data/use-cases/surveys/list-all/list-all-surveys.usecase'
import { LogRepository } from '@/infra/database/mongodb/repositories/log/log.repository'
import { SurveyRepository } from '@/infra/database/mongodb/repositories/survey/survey.repository'
import { ListAllSurveysController } from '@/presentation/controllers/survey/list-all/list-all-surveys.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { LogControllerDecorator } from '@/main/decorators/log.decorator'

export const makeListAllSurveysController = (): ControllerInterface => {
  const listAllSurveysRepository = new SurveyRepository()
  const listAllSurveysUseCase = new ListAllSurveysUseCase(listAllSurveysRepository)
  const listAllSurveyController = new ListAllSurveysController(listAllSurveysUseCase)
  const logRepository = new LogRepository()
  return new LogControllerDecorator(listAllSurveyController, logRepository)
}
