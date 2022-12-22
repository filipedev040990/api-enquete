import { components } from './components/components'
import { paths } from './path/paths'
import { schemas } from './schemas/schemas'

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
    name: 'Login',
    description: 'Rotas relacionadas com autenticação'
  }, {
    name: 'Enquete',
    description: 'Rotas relacionadas com enquete'
  }],
  paths,
  schemas,
  components
}
