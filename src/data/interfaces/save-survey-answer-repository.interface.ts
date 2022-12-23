import { SurveyAnswerModel } from '@/domain/models/survey-answer.model'
import { SaveSurveyAnswerModel } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'

export interface SaveSurveyAnswerRepositoryInterface {
  save (data: SaveSurveyAnswerModel): Promise<SurveyAnswerModel>
}
