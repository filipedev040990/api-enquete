import { NextFunction, Request, Response } from 'express'
import { AuthMiddleware } from '../../presentation/middlewares/auth.middleware'

export const adaptMiddleware = (middleware: AuthMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.execute(httpRequest)
    if (httpResponse.statusCode === 200) {
      req.accountId = httpResponse.body
      next()
    }
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body
    })
  }
}
