import { badRequestComponent, unauthorizedComponent, notFoundComponent, serverErrorComponent, forbiddenComponent } from './components'
import { badRequestSurveyComponent } from './components/bad-request-survey.component'
import { conflictComponent } from './components/conflict.component'
import { authenticationPath, signupPath, surveyPath } from './path'
import { accountSchema, authenticationParamsSchema, errorSchema, signupParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema } from './schemas'
import { addSurveyParamsSchema } from './schemas/add-survey-params.schema'
import { newAccountSchema } from './schemas/new-account.schema'

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
    '/signup': signupPath
  },
  schemas: {
    account: accountSchema,
    authenticationParams: authenticationParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    signupParams: signupParamsSchema,
    newAccount: newAccountSchema,
    addSurveyParams: addSurveyParamsSchema
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
