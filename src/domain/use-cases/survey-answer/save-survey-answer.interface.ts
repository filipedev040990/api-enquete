import { SurveyAnswerModel } from '@/domain/models/survey-answer.model'
import { SurveyResultModel } from '@/domain/models/survey-result.model'

export type SaveSurveyAnswerModel = Omit<SurveyAnswerModel, 'id'>

export interface SaveSurveyAnswerUseCaseInterface {
  execute (data: SaveSurveyAnswerModel): Promise<SurveyResultModel>
}
