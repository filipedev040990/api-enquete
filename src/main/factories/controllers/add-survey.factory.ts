import { AddSurveyController } from '@/presentation/controllers/survey/add/add-survey.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { makeAddSurveyValidationComposite } from './add-survey-validation.factory'
import { makeAddSurveyUseCaseFactory } from '@/main/factories/usecases'
import { makeLogDecoratorFactory } from '../decorators'

export const makeAddSurveyController = (): ControllerInterface => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidationComposite(), makeAddSurveyUseCaseFactory())
  return makeLogDecoratorFactory(addSurveyController)
}
