import { badRequestComponent, unauthorizedComponent, notFoundComponent, serverErrorComponent } from './components'
import { authenticationPath } from './path'
import { accountSchema, authenticationParamsSchema } from './schemas'
import { errorSchema } from './schemas/error.schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API desenvolvida no curso do Rodrigo Manguinho',
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
  }],
  paths: {
    '/authentication': authenticationPath
  },
  schemas: {
    account: accountSchema,
    authenticationParams: authenticationParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    notFound: notFoundComponent,
    serverError: serverErrorComponent
  }
}
