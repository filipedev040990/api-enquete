import { SaveSurveyResultUseCase } from '@/data/use-cases/survey-result/save/save-survey-result.usecase'
import { GetSurveyByIdUseCase } from '@/data/use-cases/surveys/get-by-id/get-survey-by-id.usecase'
import { LogRepository } from '@/infra/database/mongodb/repositories/log/log.repository'
import { SurveyResultRepository } from '@/infra/database/mongodb/repositories/survey-result/survey-result.repository'
import { SurveyRepository } from '@/infra/database/mongodb/repositories/survey/survey.repository'
import { LogControllerDecorator } from '@/main/decorators/log.decorator'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save/save-survey-result.controller'
import { ControllerInterface } from '@/presentation/interfaces'

export const makeSaveSurveyResultController = (): ControllerInterface => {
  const surveyRepository = new SurveyRepository()
  const getSurveyByIdUseCase = new GetSurveyByIdUseCase(surveyRepository)
  const surveyResultRepository = new SurveyResultRepository()
  const saveSurveyResultUseCase = new SaveSurveyResultUseCase(surveyResultRepository)
  const controller = new SaveSurveyResultController(getSurveyByIdUseCase, saveSurveyResultUseCase)
  const repository = new LogRepository()
  return new LogControllerDecorator(controller, repository)
}
