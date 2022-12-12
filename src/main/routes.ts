import { Router } from 'express'
import { adaptMiddleware } from './adapters/express-middleware.adapter'
import { adaptRoute } from './adapters/express-route.adapter'
import { makeAuthenticationController } from './factories/authentication/authentication.factory'
import { makeAuthMiddleware } from './factories/middlewares/auth-middleware.factory'
import { makeSignupControler } from './factories/signup/signup.factory'
import { makeAddSurveyController } from './factories/survey/add/add-survey.factory'

const router = Router()

router.post('/signup', adaptRoute(makeSignupControler()))
router.post('/authentication', adaptRoute(makeAuthenticationController()))
router.post('/survey', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeAddSurveyController()))

export { router }
