
import { ControllerInterface } from '@/presentation/interfaces'
import { makeGetSurveyByIdUseCaseFactory } from '@/main/factories/usecases'
import { makeLogDecoratorFactory } from '../decorators'
import { makesaveSurveyAnswerUseCaseFactory } from '../usecases/save-survey-answer-usecase.factory'
import { SaveSurveyAnswerController } from '@/presentation/controllers/survey-answer/save/save-survey-answer.controller'

export const makesaveSurveyAnswerController = (): ControllerInterface => {
  const saveSurveyAnswerController = new SaveSurveyAnswerController(makeGetSurveyByIdUseCaseFactory(), makesaveSurveyAnswerUseCaseFactory())
  return makeLogDecoratorFactory(saveSurveyAnswerController)
}
