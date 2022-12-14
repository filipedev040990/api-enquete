import { SurveyModel } from '../../models/survey.model'

export interface ListAllSurveysUseCaseInterface {
  execute(): Promise<SurveyModel[] | null>
}
