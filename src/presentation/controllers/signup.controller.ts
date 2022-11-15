import MissinParamError from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../interfaces/http'

export default class SignupController {
  async execute (request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissinParamError(field))
      }
    }
  }
}
