import { ListResultSurveyUseCase } from '@/data/use-cases/surveys/list-result/list-result-survey.usecase'
import { SurveyAnswerRepository } from '@/infra/database/mongodb/repositories/survey-answer/survey-answer.repository'
import { SurveyRepository } from '@/infra/database/mongodb/repositories/survey/survey.repository'

export const makeListSurveyResultUseCaseFactory = (): ListResultSurveyUseCase => {
  const listSurveyResultRepository = new SurveyAnswerRepository()
  const getSurveyByIdRepository = new SurveyRepository()
  return new ListResultSurveyUseCase(listSurveyResultRepository, getSurveyByIdRepository)
}
