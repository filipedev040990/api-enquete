import { SurveyModel } from '../../domain/models/survey.model'

export interface AddSurveyRepositoryInterface {
  create(survey: SurveyModel): Promise<void>
}
