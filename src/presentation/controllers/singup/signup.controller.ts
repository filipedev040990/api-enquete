import { InvalidParamError, MissinParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http.helper'
import { ControllerInterface, EmailValidatorInterface, HttpRequest, HttpResponse } from '../../interfaces'

export default class SignupController implements ControllerInterface {
  constructor (private readonly emailValidator: EmailValidatorInterface) {}
  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissinParamError(field))
        }
      }

      const { password, passwordConfirmation, email } = request.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password confirmation failed'))
      }

      const emailIsValid = await this.emailValidator.execute(email)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
