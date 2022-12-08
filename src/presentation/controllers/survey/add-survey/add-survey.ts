import { ControllerInterface, HttpRequest, HttpResponse, ValidationInterface } from '../../../interfaces'

export class AddSurveyController implements ControllerInterface {
  constructor (
    private readonly validation: ValidationInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(request.body)
    return null
  }
}
