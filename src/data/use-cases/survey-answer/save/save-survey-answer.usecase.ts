import { SaveSurveyAnswerRepositoryInterface } from '@/data/interfaces/save-survey-answer-repository.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyAnswerModel, SaveSurveyAnswerUseCaseInterface } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'

export class SaveSurveyAnswerUseCase implements SaveSurveyAnswerUseCaseInterface {
  constructor (private readonly SurveyAnswerRepository: SaveSurveyAnswerRepositoryInterface) {}
  async execute (data: SaveSurveyAnswerModel): Promise<SurveyResultModel> {
    return await this.SurveyAnswerRepository.save({
      accountId: data.accountId,
      surveyId: data.surveyId,
      answer: data.answer,
      date: data.date
    })
  }
}
