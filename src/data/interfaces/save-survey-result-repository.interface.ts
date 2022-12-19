import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResultModel } from '@/domain/use-cases/survey/save-survey-result.interface'

export interface SaveSurveyResultRepositoryInterface {
  save (data: SaveSurveyResultModel): Promise<SurveyResultModel>
}
