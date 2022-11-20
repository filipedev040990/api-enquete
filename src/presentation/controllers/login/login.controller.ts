import { MissinParamError } from '../../errors'
import { badRequest } from '../../helpers/http.helper'
import { ControllerInterface, EmailValidatorInterface, HttpRequest, HttpResponse } from '../../interfaces'

export class LoginController implements ControllerInterface {
  constructor (
    private readonly emailValidator: EmailValidatorInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissinParamError(field))
      }
    }
    const { email } = request.body
    await this.emailValidator.execute(email)
    return null
  }
}
