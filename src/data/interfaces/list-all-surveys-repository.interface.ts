import { SurveyModel } from '../../domain/models/survey.model'

export interface ListAllSurveysRepositoryInterface {
  listAll (): Promise<SurveyModel [] | null>
}
