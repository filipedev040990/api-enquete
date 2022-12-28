import { ListResultSurveyRepositoryInterface } from '@/data/interfaces/list-result-survey-repository.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'

export class ListResultSurveyUseCase implements ListResultSurveyUseCaseInterface {
  constructor (private readonly surveyRepository: ListResultSurveyRepositoryInterface) {}
  async execute (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    await this.surveyRepository.getBySurveyIdAndAccountId(surveyId, accountId)
    return null
  }
}
