import { ListAllSurveysUseCase } from '@/data/use-cases/surveys/list-all/list-all-surveys.usecase'
import { ListAllSurveysUseCaseInterface } from '@/domain/use-cases/survey/list-all-surveys.interface'
import { SurveyRepository } from '@/infra/database/mongodb/repositories/survey/survey.repository'

export const makeListAllSurveyUseCaseFactory = (): ListAllSurveysUseCaseInterface => {
  const listAllSurveysRepository = new SurveyRepository()
  return new ListAllSurveysUseCase(listAllSurveysRepository)
}
