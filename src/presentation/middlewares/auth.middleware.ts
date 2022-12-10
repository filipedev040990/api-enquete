import { GetAccountByTokenUseCaseInterface } from '../../domain/use-cases/account/get-account-by-token.interface'
import { AccessDeniedError } from '../errors/access-denied.error'
import { forbidden, serverError, success } from '../helpers/http.helper'
import { HttpRequest, HttpResponse } from '../interfaces'
import { AuthMiddlewareInterface } from '../interfaces/middleware.interface'

export class AuthMiddleware implements AuthMiddlewareInterface {
  constructor (
    private readonly getAccountByTokenUseCase: GetAccountByTokenUseCaseInterface
  ) {}

  async execute (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.headers?.authorization) {
        const token = httpRequest.headers.authorization?.split(' ')[1]
        const account = await this.getAccountByTokenUseCase.execute(token)
        if (account) {
          return success({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
