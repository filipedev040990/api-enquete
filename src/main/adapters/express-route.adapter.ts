import { Request, Response } from 'express'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../presentation/interfaces'
import { logger } from '../../infra/logger/logger'

export const adaptRoute = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const infoLog = {
      method: req.method,
      endpoint: req.url,
      body: req.body,
      params: req.params,
      query: req.query
    }

    logger.info(infoLog)

    const httpResponse: HttpResponse = await controller.execute(httpRequest)
    const bodyResponse = httpResponse.statusCode === 500 ? { error: httpResponse.body.message } : httpResponse.body
    res.status(httpResponse.statusCode).json(bodyResponse)
  }
}
