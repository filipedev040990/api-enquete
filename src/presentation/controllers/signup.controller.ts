import { HttpRequest, HttpResponse } from '../interfaces/http'

export default class SignupController {
  async execute (request: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: new Error('Missing param error: name')
    }
  }
}
