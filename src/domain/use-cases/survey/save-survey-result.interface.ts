import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SurveyModel } from '@/domain/models/survey.model'

export type AddSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResultUseCaseInterface {
  execute (data: AddSurveyResultModel): Promise<SurveyModel>
}
