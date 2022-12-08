import { badRequest } from '../../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse, ValidationInterface } from '../../../interfaces'

export class AddSurveyController implements ControllerInterface {
  constructor (
    private readonly validation: ValidationInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(request.body)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}
