import { AddSurveyUseCase } from '../../../../data/use-cases/surveys/add-survey.usecase'
import { LogRepository } from '../../../../infra/database/mongodb/repositories/log/log.repository'
import { SurveyRepository } from '../../../../infra/database/mongodb/repositories/survey/survey.repository'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add/add-survey'
import { ControllerInterface } from '../../../../presentation/interfaces'
import { LogControllerDecorator } from '../../../decorators/log.decorator'
import { makeAddSurveyValidationComposite } from './add-survey-validation.factory'

export const makeAddSurveyController = (): ControllerInterface => {
  const addSurveyRepository = new SurveyRepository()
  const addSurveyUseCase = new AddSurveyUseCase(addSurveyRepository)
  const addSurveyController = new AddSurveyController(makeAddSurveyValidationComposite(), addSurveyUseCase)
  const logRepository = new LogRepository()
  return new LogControllerDecorator(addSurveyController, logRepository)
}
