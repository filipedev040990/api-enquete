import { GetAccountByTokenUseCaseInterface } from '@/domain/use-cases/account/get-account-by-token.interface'
import { AccessDeniedError } from '@/presentation/errors/access-denied.error'
import { forbidden, serverError, success } from '@/presentation/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/presentation/interfaces'
import { AuthMiddlewareInterface } from '@/presentation/interfaces/middleware.interface'

export class AuthMiddleware implements AuthMiddlewareInterface {
  constructor (
    private readonly getAccountByTokenUseCase: GetAccountByTokenUseCaseInterface,
    private readonly role?: string
  ) {}

  async execute (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.headers?.authorization) {
        const token = httpRequest.headers.authorization?.split(' ')[1]
        const account = await this.getAccountByTokenUseCase.execute(token, this.role)
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
