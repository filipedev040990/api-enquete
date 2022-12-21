import { SaveSurveyResultUseCase } from '@/data/use-cases/survey-result/save/save-survey-result.usecase'
import { SaveSurveyResultUseCaseInterface } from '@/domain/use-cases/survey/save-survey-result.interface'
import { SurveyResultRepository } from '@/infra/database/mongodb/repositories/survey-result/survey-result.repository'

export const makeSaveSurveyResultUseCaseFactory = (): SaveSurveyResultUseCaseInterface => {
  const surveyResultRepository = new SurveyResultRepository()
  return new SaveSurveyResultUseCase(surveyResultRepository)
}
