import { authenticationPath, signupPath, surveyPath, surveyResultPath } from '.'

export const paths = {
  '/authentication': authenticationPath,
  '/survey': surveyPath,
  '/signup': signupPath,
  '/survey/:surveyId/results': surveyResultPath
}
