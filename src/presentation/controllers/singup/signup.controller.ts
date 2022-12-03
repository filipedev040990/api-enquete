import { AddAccountInterface } from '../../../domain/use-cases/signup/add-account.interface'
import { badRequest, serverError, success } from '../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse, ValidationInterface } from '../../interfaces'

export default class SignupController implements ControllerInterface {
  constructor (
    private readonly addAccount: AddAccountInterface,
    private readonly validation: ValidationInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }

      const { name, password, email } = request.body
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
