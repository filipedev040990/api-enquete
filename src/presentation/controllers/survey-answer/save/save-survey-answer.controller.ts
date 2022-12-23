import { SaveSurveyAnswerUseCaseInterface } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'
import { GetSurveyByIdUseCaseInterface } from '@/domain/use-cases/survey/get-survey-by-id.interface'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'

export class SaveSurveyAnswerController implements ControllerInterface {
  constructor (
    private readonly getSurveyByIdUseCase: GetSurveyByIdUseCaseInterface,
    private readonly saveSurveyAnswerUseCase: SaveSurveyAnswerUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.getSurveyByIdUseCase.execute(request.params.surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(request.body.answer)) {
          return forbidden(new InvalidParamError('answer'))
        }

        const surveyAnswer = await this.saveSurveyAnswerUseCase.execute({
          surveyId: request.params.surveyId,
          accountId: request.accountId,
          date: new Date(),
          answer: request.body.answer
        })

        return success(surveyAnswer)
      } else {
        return forbidden(new InvalidParamError('survey_id'))
      }
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
