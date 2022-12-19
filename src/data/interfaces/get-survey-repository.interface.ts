import { SurveyModel } from '@/domain/models/survey.model'

export interface GetSurveyByIdRepositoryInterface {
  getById (id: string): Promise<SurveyModel | null>
}
