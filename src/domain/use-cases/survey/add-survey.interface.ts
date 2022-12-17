import { SurveyModel } from '@/domain/models/survey.model'

export interface AddSurveyUseCaseInterface {
  execute(survey: Omit<SurveyModel, 'id'>): Promise<void>
}
