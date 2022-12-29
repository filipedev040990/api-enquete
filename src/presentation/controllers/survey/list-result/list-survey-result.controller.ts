
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'
import { success } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class ListSurveyResultController implements ControllerInterface {
  constructor (private readonly listResultSurveyUseCase: ListResultSurveyUseCaseInterface) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    const surveyResult = await this.listResultSurveyUseCase.execute(request.params.surveyId, request.accountId)
    return success(surveyResult)
  }
}
