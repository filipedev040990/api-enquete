import { accountSchema, addSurveyParamsSchema, authenticationParamsSchema, errorSchema, newAccountSchema, saveSurveyAnswerParamsSchema, signupParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema, savesurveyAnswerchema } from '.'

export const schemas = {
  account: accountSchema,
  authenticationParams: authenticationParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  signupParams: signupParamsSchema,
  newAccount: newAccountSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyAnswerParams: saveSurveyAnswerParamsSchema,
  surveyAnswer: surveyAnswerSchema,
  saveSurveyAnswer: savesurveyAnswerchema
}
