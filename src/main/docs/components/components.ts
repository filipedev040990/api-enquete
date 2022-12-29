import { badRequestComponent, badRequestSurveyResultComponent, forbiddenComponent, notFoundComponent, serverErrorComponent, unauthorizedComponent } from '.'
import { badRequestSurveyComponent } from './bad-request-survey.component'
import { conflictComponent } from './conflict.component'

export const components = {
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
  badRequestSurvey: badRequestSurveyComponent,
  badRequestSurveyResult: badRequestSurveyResultComponent
}
