import { NextFunction, Request, Response } from 'express'
import { AuthMiddlewareInterface } from '../../presentation/interfaces/middleware.interface'

export const adaptMiddleware = (middleware: AuthMiddlewareInterface) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.execute(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      req.accountId = httpResponse.body
      return next()
    }
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body
    })
  }
}
