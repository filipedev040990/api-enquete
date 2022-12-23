import { SurveyAnswerModel } from '@/domain/models/survey-answer.model'

export type SaveSurveyAnswerModel = Omit<SurveyAnswerModel, 'id'>

export interface SaveSurveyAnswerUseCaseInterface {
  execute (data: SaveSurveyAnswerModel): Promise<SurveyAnswerModel>
}
