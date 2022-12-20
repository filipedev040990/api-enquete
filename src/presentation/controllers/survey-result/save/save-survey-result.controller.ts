import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class SaveSurveyResultController implements ControllerInterface {
  constructor (
    private readonly getSurveyByIdUseCase: GetSurveyByIdUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    await this.getSurveyByIdUseCase.execute(request.params.surveyId)
    return null
  }
}
