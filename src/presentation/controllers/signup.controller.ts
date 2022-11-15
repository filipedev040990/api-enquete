import InvalidParamError from '../errors/invalid-param.error'
import MissinParamError from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helper'
import { ControllerInterface } from '../interfaces/controller.interface'
import { EmailValidatorInterface } from '../interfaces/email-validator.interface'
import { HttpRequest, HttpResponse } from '../interfaces/http.interface'

export default class SignupController implements ControllerInterface {
  constructor (private readonly emailValidator: EmailValidatorInterface) {}
  async execute (request: HttpRequest): Promise<HttpResponse> {
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

    await this.emailValidator.execute(email)
  }
}
