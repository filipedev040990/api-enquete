import { AddSurveyModel } from '@/domain/models/add-survey.model'

export interface AddSurveyUseCaseInterface {
  execute(survey: AddSurveyModel): Promise<void>
}
