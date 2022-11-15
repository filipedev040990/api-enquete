import { AddAccountInterface } from '../../../domain/use-cases/signup/add-account.interface'
import { InvalidParamError, MissinParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers/http.helper'
import { ControllerInterface, EmailValidatorInterface, HttpRequest, HttpResponse } from '../../interfaces'

export default class SignupController implements ControllerInterface {
  constructor (
    private readonly emailValidator: EmailValidatorInterface,
    private readonly addAccount: AddAccountInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissinParamError(field))
        }
      }

      const { name, password, passwordConfirmation, email } = request.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password confirmation failed'))
      }

      const emailIsValid = await this.emailValidator.execute(email)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.execute({
        name,
        email,
        password
      })

      return success(account)
    } catch (error) {
      return serverError()
    }
  }
}
