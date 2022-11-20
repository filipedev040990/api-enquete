import { AuthenticationUseCaseInterface } from '../../../domain/use-cases/authentication/authentication.interface'
import { InvalidParamError, MissinParamError } from '../../errors'
import { badRequest, serverError, success, unauthorized } from '../../helpers/http.helper'
import { ControllerInterface, EmailValidatorInterface, HttpRequest, HttpResponse } from '../../interfaces'

export class LoginController implements ControllerInterface {
  constructor (
    private readonly emailValidator: EmailValidatorInterface,
    private readonly authenticationUseCase: AuthenticationUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissinParamError(field))
        }
      }
      const { email, password } = request.body

      const isValidEmail = await this.emailValidator.execute(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

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
