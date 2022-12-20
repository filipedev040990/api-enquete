import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class SaveSurveyResultController implements ControllerInterface {
  constructor (
    private readonly getSurveyByIdUseCase: GetSurveyByIdUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.getSurveyByIdUseCase.execute(request.params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('survey_id'))
      } else if (!survey.answers.includes(request.body.answer)) {
        return forbidden(new InvalidParamError('answer'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
