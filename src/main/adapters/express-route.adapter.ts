import { Request, Response } from 'express'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../presentation/interfaces'

export const adaptRoute = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse: HttpResponse = await controller.execute(httpRequest)
    const bodyResponse = httpResponse.statusCode === 500 ? { error: httpResponse.body.message } : httpResponse.body
    res.status(httpResponse.statusCode).json(bodyResponse)
  }
}
