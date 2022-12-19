import { SurveyModel } from '@/domain/models/survey.model'

export interface GetSurveyById {
  getById (id: string): Promise<SurveyModel | null>
}
