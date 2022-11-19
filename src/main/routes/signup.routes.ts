import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route.adapter'
import { makeSignupControler } from '../factories/signup.factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupControler()))
}
