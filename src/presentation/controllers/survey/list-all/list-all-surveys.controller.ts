import { ListAllSurveysUseCaseInterface } from '../../../../domain/use-cases/survey/list-all-surveys.interface'
import { noContent } from '../../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../../interfaces'

export class ListAllSurveysController implements ControllerInterface {
  constructor (private readonly listAllSurveysUseCase: ListAllSurveysUseCaseInterface) {}
  async execute (request: HttpRequest): Promise<HttpResponse> {
    await this.listAllSurveysUseCase.execute()
    return noContent()
  }
}
