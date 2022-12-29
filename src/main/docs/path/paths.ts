import { authenticationPath, signupPath, surveyPath, surveyAnswerPath, surveyResultPath } from '.'

export const paths = {
  '/authentication': authenticationPath,
  '/surveys': surveyPath,
  '/signup': signupPath,
  '/surveys/{surveyId}/save-answer': surveyAnswerPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
