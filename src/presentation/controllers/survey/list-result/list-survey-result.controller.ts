
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class ListSurveyResultController implements ControllerInterface {
  constructor (private readonly listResultSurveyUseCase: ListResultSurveyUseCaseInterface) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const surveyResult = await this.listResultSurveyUseCase.execute(request.params.surveyId, request.accountId)
      if (!surveyResult) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return success(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
