import { Router } from 'express'
import { adaptRoute } from './adapters/express-route.adapter'
import { makeAuthenticationController } from './factories/authentication/authentication.factory'
import { makeSignupControler } from './factories/signup/signup.factory'

const router = Router()

router.post('/signup', adaptRoute(makeSignupControler()))
router.post('/authentication', adaptRoute(makeAuthenticationController()))

export { router }
