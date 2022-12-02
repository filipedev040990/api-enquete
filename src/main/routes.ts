import { Router } from 'express'
import { adaptRoute } from './adapters/express-route.adapter'
import { makeSignupControler } from './factories/signup/signup.factory'

const router = Router()

router.post('/signup', adaptRoute(makeSignupControler()))

export { router }
