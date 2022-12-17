import { AuthenticationUseCaseInterface } from '@/domain/use-cases/authentication/authentication.interface'
import env from '@/main/env'
import { badRequest, serverError, success, unauthorized } from '@/presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'
import { ValidationInterface } from '@/presentation/interfaces/validation.interface'

export class AuthenticationController implements ControllerInterface {
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
      return success({ token: accessToken, expiresIn: env.encrypter.expiresIn })
    } catch (error) {
      return serverError(error)
    }
  }
}
