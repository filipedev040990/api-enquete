
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class ListSurveyResultController implements ControllerInterface {
  constructor (private readonly listResultSurveyUseCase: ListResultSurveyUseCaseInterface) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    if (!request.params.surveyId) {
      return badRequest(new MissingParamError('surveyId'))
    }
    await this.listResultSurveyUseCase.execute(request.params.surveyId, request.accountId)
    return null
  }
}
