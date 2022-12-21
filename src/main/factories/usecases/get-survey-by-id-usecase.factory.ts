import { GetSurveyByIdUseCase } from '@/data/use-cases/surveys/get-by-id/get-survey-by-id.usecase'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { SurveyRepository } from '@/infra/database/mongodb/repositories/survey/survey.repository'

export const makeGetSurveyByIdUseCaseFactory = (): GetSurveyByIdUseCaseInterface => {
  const surveyRepository = new SurveyRepository()
  return new GetSurveyByIdUseCase(surveyRepository)
}
