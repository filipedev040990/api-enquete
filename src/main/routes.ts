import { Router } from 'express'
import { adaptMiddleware } from './adapters/express-middleware.adapter'
import { adaptRoute } from './adapters/express-route.adapter'
import { makeAddSurveyController, makeListAllSurveysController, makesaveSurveyAnswerController, makeSignupControler, makeAuthenticationController, makeAuthMiddleware } from './factories'

const router = Router()

router.post('/signup', adaptRoute(makeSignupControler()))
router.post('/authentication', adaptRoute(makeAuthenticationController()))

router.post('/survey', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeAddSurveyController()))
router.get('/survey', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeListAllSurveysController()))
router.put('/survey/:surveyId/saveAnswer', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makesaveSurveyAnswerController()))

export { router }
