import { SurveyModel } from '@/domain/models/survey.model'

export interface GetSurveyByIdUseCaseInterface {
  execute (id: string): Promise<SurveyModel | null>
}
