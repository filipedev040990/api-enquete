import { SurveyResultModel } from '@/domain/models/survey-result.model'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResultUseCaseInterface {
  execute (data: SaveSurveyResultModel): Promise<SurveyResultModel>
}
