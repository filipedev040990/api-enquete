import { SurveyResultModel } from '@/domain/models/survey-result.model'

export interface ListResultSurveyUseCaseInterface {
  execute(surveyId: string, accountId: string): Promise<SurveyResultModel>
}
