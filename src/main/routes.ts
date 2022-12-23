import { Router } from 'express'
import { adaptMiddleware } from './adapters/express-middleware.adapter'
import { adaptRoute } from './adapters/express-route.adapter'
import { makeAddSurveyController, makeListAllSurveysController, makesaveSurveyAnswerController, makeSignupControler, makeAuthenticationController, makeAuthMiddleware } from './factories'

const router = Router()

router.post('/signup', adaptRoute(makeSignupControler()))
router.post('/authentication', adaptRoute(makeAuthenticationController()))

router.post('/surveys', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeAddSurveyController()))
router.get('/surveys', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeListAllSurveysController()))
router.put('/surveys/:surveyId/save-answer', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makesaveSurveyAnswerController()))

export { router }
