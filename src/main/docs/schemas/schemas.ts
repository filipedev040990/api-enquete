import { accountSchema, addSurveyParamsSchema, authenticationParamsSchema, errorSchema, newAccountSchema, saveSurveyResultParamsSchema, signupParamsSchema, surveyAnswerSchema, surveyResultSchema, surveySchema, surveysSchema, saveSurveyResultSchema } from '.'

export const schemas = {
  account: accountSchema,
  authenticationParams: authenticationParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  signupParams: signupParamsSchema,
  newAccount: newAccountSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyResultParams: saveSurveyResultParamsSchema,
  surveyResult: surveyResultSchema,
  surveyAnswer: surveyAnswerSchema,
  saveSurveyResult: saveSurveyResultSchema
}
