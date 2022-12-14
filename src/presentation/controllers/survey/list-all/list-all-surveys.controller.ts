import { ListAllSurveysUseCaseInterface } from '../../../../domain/use-cases/survey/list-all-surveys.interface'
import { noContent, success } from '../../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../../interfaces'

export class ListAllSurveysController implements ControllerInterface {
  constructor (private readonly listAllSurveysUseCase: ListAllSurveysUseCaseInterface) {}
  async execute (request: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.listAllSurveysUseCase.execute()
    if (surveys) {
      return success(surveys)
    }
    return noContent()
  }
}
