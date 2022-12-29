
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class ListSurveyResultController implements ControllerInterface {
  constructor (private readonly listResultSurveyUseCase: ListResultSurveyUseCaseInterface) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    await this.listResultSurveyUseCase.execute(request.params.surveyId, request.accountId)
    return null
  }
}
