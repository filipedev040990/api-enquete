import { GetSurveyByIdRepositoryInterface } from '@/data/interfaces/get-survey-repository.interface'
import { ListResultSurveyRepositoryInterface } from '@/data/interfaces/list-result-survey-repository.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SurveyModel } from '@/domain/models/survey.model'
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'

export class ListResultSurveyUseCase implements ListResultSurveyUseCaseInterface {
  constructor (
    private readonly listResultSurveyRepository: ListResultSurveyRepositoryInterface,
    private readonly getSurveyByIdRepository: GetSurveyByIdRepositoryInterface
  ) {}

  async execute (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.listResultSurveyRepository.getBySurveyIdAndAccountId(surveyId, accountId)
    if (!surveyResult) {
      surveyResult = await this.getSurveyByIdRepository.getById(surveyId)
      surveyResult = this.makeEmptyResult(surveyResult)
    }
    return surveyResult
  }

  private makeEmptyResult (survey: SurveyModel): SurveyResultModel {
    return {
      surveyId: survey.id,
      question: survey.question,
      date: survey.date,
      answers: survey.answers.map(answer => ({
        ...answer,
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }))
    }
  }
}
