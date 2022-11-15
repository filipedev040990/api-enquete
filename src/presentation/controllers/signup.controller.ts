import MissinParamError from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../interfaces/http'

export default class SignupController {
  async execute (request: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: badRequest(new MissinParamError('name'))
    }
  }
}
