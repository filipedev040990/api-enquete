import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class SaveSurveyResultController implements ControllerInterface {
  constructor (
    private readonly getSurveyByIdUseCase: GetSurveyByIdUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    const surveyId = request.params.surveyId
    const { answer } = request.body

    const survey = await this.getSurveyByIdUseCase.execute(surveyId)
    if (!survey) {
      return forbidden(new InvalidParamError('survey_id'))
    } else if (!survey.answers.includes(answer)) {
      return forbidden(new InvalidParamError('answer'))
    }
    return null
  }
}
