import { AuthenticationUseCaseInterface } from '../../../domain/use-cases/authentication/authentication.interface'
import { badRequest, serverError, success, unauthorized } from '../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../interfaces'
import { ValidationInterface } from '../../interfaces/validation.interface'

export class LoginController implements ControllerInterface {
  constructor (
    private readonly authenticationUseCase: AuthenticationUseCaseInterface,
    private readonly validation: ValidationInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = request.body

      const accessToken = await this.authenticationUseCase.execute({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return success(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
