import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class SaveSurveyResultController implements ControllerInterface {
  constructor (
    private readonly getSurveyByIdUseCase: GetSurveyByIdUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    const answers = await this.getSurveyByIdUseCase.execute(request.params.surveyId)
    if (!answers) {
      return forbidden(new InvalidParamError('survey_id'))
    }
    return null
  }
}
