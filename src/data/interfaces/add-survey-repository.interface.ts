import { SurveyModel } from '@/domain/models/survey.model'

export interface AddSurveyRepositoryInterface {
  create(survey: Omit<SurveyModel, 'id'>): Promise<void>
}
