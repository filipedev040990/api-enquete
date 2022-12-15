import { ListAllSurveysUseCaseInterface } from '../../../../domain/use-cases/survey/list-all-surveys.interface'
import { noContent, serverError, success } from '../../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../../interfaces'

export class ListAllSurveysController implements ControllerInterface {
  constructor (private readonly listAllSurveysUseCase: ListAllSurveysUseCaseInterface) {}
  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.listAllSurveysUseCase.execute()
      if (surveys) {
        return success(surveys)
      }
      return noContent()
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
