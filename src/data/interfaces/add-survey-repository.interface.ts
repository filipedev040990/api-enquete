import { AddSurveyModel } from '../../domain/models/add-survey.model'

export interface AddSurveyRepositoryInterface {
  create(survey: AddSurveyModel): Promise<void>
}
