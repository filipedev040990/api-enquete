import { badRequestComponent, unauthorizedComponent, notFoundComponent, serverErrorComponent, forbiddenComponent } from './components'
import { badRequestSurveyComponent } from './components/bad-request-survey.component'
import { conflictComponent } from './components/conflict.component'
import { authenticationPath, signupPath, surveyPath } from './path'
import { surveyResultPath } from './path/survey-result.path'
import { accountSchema, authenticationParamsSchema, errorSchema, signupParamsSchema, surveySchema, surveysSchema, addSurveyParamsSchema, newAccountSchema, saveSurveyResultParamsSchema, surveyResultSchema, surveyResultAnswerSchema } from './schemas'
import { saveSurveyResultSchema } from './schemas/save-survey-result.schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API Enquete',
    description: 'API para realização de enquete com perguntas sobre programadores',
    version: '1.0.0'
  },
  licence: {
    name: 'GPL-3.0-or-later',
    url: 'https://www.gnu.org/licenses/gpl-3.0-standalone.html'
  },
  contact: {
    name: 'Filipe Siqueira',
    email: 'filipedev040990@gmail.com'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/authentication': authenticationPath,
    '/survey': surveyPath,
    '/signup': signupPath,
    '/survey/:surveyId/results': surveyResultPath
  },
  schemas: {
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
    surveyResultAnswer: surveyResultAnswerSchema,
    saveSurveyResult: saveSurveyResultSchema
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    notFound: notFoundComponent,
    serverError: serverErrorComponent,
    forbidden: forbiddenComponent,
    conflict: conflictComponent,
    badRequestSurvey: badRequestSurveyComponent
  }
}
