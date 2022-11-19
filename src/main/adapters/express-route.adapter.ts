import { Request, Response } from 'express'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../presentation/interfaces'

export const adaptRoute = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse: HttpResponse = await controller.execute(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
