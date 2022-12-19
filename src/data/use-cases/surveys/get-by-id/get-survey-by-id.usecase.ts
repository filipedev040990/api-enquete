import { GetSurveyByIdRepositoryInterface } from '@/data/interfaces/get-survey-repository.interface'
import { SurveyModel } from '@/domain/models/survey.model'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'

export class GetSurveyByIdUseCase implements GetSurveyByIdUseCaseInterface {
  constructor (private readonly surveyRepository: GetSurveyByIdRepositoryInterface) {}
  async execute (id: string): Promise<SurveyModel> {
    await this.surveyRepository.getById(id)
    return null
  }
}
