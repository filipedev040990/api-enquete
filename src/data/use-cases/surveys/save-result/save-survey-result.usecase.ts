import { SaveSurveyResultRepositoryInterface } from '@/data/interfaces/save-survey-result-repository.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResultModel, SaveSurveyResultUseCaseInterface } from '@/domain/use-cases/survey/save-survey-result.interface'

export class SaveSurveyResultUseCase implements SaveSurveyResultUseCaseInterface {
  constructor (private readonly surveyResultRepository: SaveSurveyResultRepositoryInterface) {}
  async execute (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.surveyResultRepository.save({
      accountId: data.accountId,
      surveyId: data.surveyId,
      answer: data.answer,
      date: data.date
    })
    return null
  }
}
