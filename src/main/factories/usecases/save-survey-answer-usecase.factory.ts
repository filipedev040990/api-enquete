
import { SaveSurveyAnswerUseCase } from '@/data/use-cases/survey-answer/save/save-survey-answer.usecase'
import { SaveSurveyAnswerUseCaseInterface } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'
import { SurveyAnswerRepository } from '@/infra/database/mongodb/repositories/survey-answer/survey-answer.repository'

export const makesaveSurveyAnswerUseCaseFactory = (): SaveSurveyAnswerUseCaseInterface => {
  const surveyAnswerRepository = new SurveyAnswerRepository()
  return new SaveSurveyAnswerUseCase(surveyAnswerRepository)
}
