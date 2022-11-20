import { MissinParamError } from '../../errors'
import { badRequest } from '../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../interfaces'

export class LoginController implements ControllerInterface {
  async execute (request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissinParamError(field))
      }
    }
    return null
  }
}
