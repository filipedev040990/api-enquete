import { ListAllSurveysUseCase } from '../../../../data/use-cases/surveys/list-all/list-all-surveys.usecase'
import { SurveyRepository } from '../../../../infra/database/mongodb/repositories/survey/survey.repository'
import { ListAllSurveysController } from '../../../../presentation/controllers/survey/list-all/list-all-surveys.controller'

export const makeListAllSurveysController = (): ListAllSurveysController => {
  const listAllSurveysRepository = new SurveyRepository()
  const listAllSurveysUseCase = new ListAllSurveysUseCase(listAllSurveysRepository)
  return new ListAllSurveysController(listAllSurveysUseCase)
}
