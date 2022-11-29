import { AddAccountInterface } from '../../../domain/use-cases/signup/add-account.interface'
import { InvalidParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers/http.helper'
import { ControllerInterface, EmailValidatorInterface, HttpRequest, HttpResponse } from '../../interfaces'
import { ValidationInterface } from '../../validators/validation.interface'

export default class SignupController implements ControllerInterface {
  constructor (
    private readonly emailValidator: EmailValidatorInterface,
    private readonly addAccount: AddAccountInterface,
    private readonly validation: ValidationInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
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

      return success(account, 201)
    } catch (error) {
      return serverError(error)
    }
  }
}
