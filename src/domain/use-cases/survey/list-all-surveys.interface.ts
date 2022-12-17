import { SurveyModel } from '@/domain/models/survey.model'

export interface ListAllSurveysUseCaseInterface {
  execute(): Promise<SurveyModel[] | null>
}
