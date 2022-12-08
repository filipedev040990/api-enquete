import { AddSurveyRequest } from '../../domain/use-cases/survey/add-survey.interface'

export interface AddSurveyRepositoryInterface {
  create(survey: AddSurveyRequest): Promise<void>
}
