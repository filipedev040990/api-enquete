import { SurveyModel } from '../../../../domain/models/survey.model'
import { ListAllSurveysUseCaseInterface } from '../../../../domain/use-cases/survey/list-all-surveys.interface'
import { ListAllSurveysRepositoryInterface } from '../../../interfaces/list-all-surveys-repository.interface'

export class ListAllSurveysUseCase implements ListAllSurveysUseCaseInterface {
  constructor (private readonly listAllsurveysRepository: ListAllSurveysRepositoryInterface) {}
  async execute (): Promise<SurveyModel[] | null> {
    await this.listAllsurveysRepository.listAll()
    return null
  }
}
