import { SaveSurveyAnswerRepositoryInterface } from '@/data/interfaces/save-survey-answer-repository.interface'
import { SurveyAnswerModel } from '@/domain/models/survey-answer.model'
import { SaveSurveyAnswerModel, SaveSurveyAnswerUseCaseInterface } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'

export class SaveSurveyAnswerUseCase implements SaveSurveyAnswerUseCaseInterface {
  constructor (private readonly SurveyAnswerRepository: SaveSurveyAnswerRepositoryInterface) {}
  async execute (data: SaveSurveyAnswerModel): Promise<SurveyAnswerModel> {
    return await this.SurveyAnswerRepository.save({
      accountId: data.accountId,
      surveyId: data.surveyId,
      answer: data.answer,
      date: data.date
    })
  }
}
