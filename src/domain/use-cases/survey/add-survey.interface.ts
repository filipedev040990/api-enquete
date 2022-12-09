import { SurveyModel } from '../../models/survey.model'

export interface AddSurveyUseCaseInterface {
  execute(survey: SurveyModel): Promise<void>
}
