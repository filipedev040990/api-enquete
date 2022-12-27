import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyAnswerModel } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'

export interface SaveSurveyAnswerRepositoryInterface {
  save (data: SaveSurveyAnswerModel): Promise<SurveyResultModel>
}
