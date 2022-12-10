import { GetAccountByTokenUseCaseInterface } from '../../domain/use-cases/account/get-account-by-token.interface'
import { AccessDeniedError } from '../errors/access-denied.error'
import { forbidden } from '../helpers/http.helper'
import { HttpRequest, HttpResponse } from '../interfaces'
import { AuthMIddlewareInterface } from '../interfaces/middleware.interface'

export class AuthMIddleware implements AuthMIddlewareInterface {
  constructor (
    private readonly getAccountByTokenUseCase: GetAccountByTokenUseCaseInterface
  ) {}

  async execute (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (httpRequest.headers?.authorization) {
      const token = httpRequest.headers.authorization?.split(' ')[1]
      await this.getAccountByTokenUseCase.execute(token)
    }
    return forbidden(new AccessDeniedError())
  }
}
