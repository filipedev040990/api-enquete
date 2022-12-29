
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { ListResultSurveyUseCaseInterface } from '@/domain/use-cases/survey/list-result-survey.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class ListSurveyResultController implements ControllerInterface {
  constructor (
    private readonly listResultSurveyUseCase: ListResultSurveyUseCaseInterface,
    private readonly getSurveyByIdUseCase: GetSurveyByIdUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const exists = await this.getSurveyByIdUseCase.execute(request.params.surveyId)
      if (!exists) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      console.log(20)
      const surveyResult = await this.listResultSurveyUseCase.execute(request.params.surveyId, request.accountId)
      return success(surveyResult)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
