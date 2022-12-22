import { badRequestComponent, unauthorizedComponent, notFoundComponent, serverErrorComponent, forbiddenComponent } from './components'
import { authenticationPath, surveyPath } from './path'
import { accountSchema, authenticationParamsSchema, errorSchema, surveyAnswerSchema, surveySchema, surveysSchema } from './schemas'

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
    '/survey': surveyPath
  },
  schemas: {
    account: accountSchema,
    authenticationParams: authenticationParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema
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
    forbidden: forbiddenComponent
  }
}
