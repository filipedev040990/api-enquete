import { authenticationPath, signupPath, surveyPath, surveyAnswerPath } from '.'

export const paths = {
  '/authentication': authenticationPath,
  '/survey': surveyPath,
  '/signup': signupPath,
  '/survey/:surveyId/saveAnswer': surveyAnswerPath
}
