import { SurveyModel } from '../../../domain/models/survey.model'
import { AddSurveyUseCaseInterface } from '../../../domain/use-cases/survey/add-survey.interface'
import { AddSurveyRepositoryInterface } from '../../interfaces/add-survey-repository.interface'

export class AddSurveyUseCase implements AddSurveyUseCaseInterface {
  constructor (private readonly surveyRepository: AddSurveyRepositoryInterface) {}
  async execute (survey: SurveyModel): Promise<void> {
    await this.surveyRepository.create({
      question: survey.question,
      answers: survey.answers,
      date: new Date()
    })
  }
}
