import { authenticationPath, signupPath, surveyPath, surveyAnswerPath } from '.'

export const paths = {
  '/authentication': authenticationPath,
  '/surveys': surveyPath,
  '/signup': signupPath,
  '/surveys/:surveyId/save-answer': surveyAnswerPath
}
