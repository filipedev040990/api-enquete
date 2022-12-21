import { AddSurveyUseCase } from '@/data/use-cases/surveys/add/add-survey.usecase'
import { AddSurveyUseCaseInterface } from '@/domain/use-cases/survey/add-survey.interface'
import { SurveyRepository } from '@/infra/database/mongodb/repositories/survey/survey.repository'

export const makeAddSurveyUseCaseFactory = (): AddSurveyUseCaseInterface => {
  const addSurveyRepository = new SurveyRepository()
  return new AddSurveyUseCase(addSurveyRepository)
}
