import { AddSurveyUseCaseInterface } from '../../../../domain/use-cases/survey/add-survey.interface'
import { badRequest } from '../../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse, ValidationInterface } from '../../../interfaces'

export class AddSurveyController implements ControllerInterface {
  constructor (
    private readonly validation: ValidationInterface,
    private readonly addSurveyUseCase: AddSurveyUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(request.body)
    if (error) {
      return badRequest(error)
    }

    const { question, answers } = request.body
    await this.addSurveyUseCase.execute({
      question,
      answers
    })
    return null
  }
}
