import { SurveyResultModel } from '@/domain/models/survey-result.model'

export type SaveurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResultUseCaseInterface {
  execute (data: SaveurveyResultModel): Promise<SurveyResultModel>
}
