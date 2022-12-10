import { AccessDeniedError } from '../errors/access-denied.error'
import { forbidden } from '../helpers/http.helper'
import { HttpRequest, HttpResponse } from '../interfaces'
import { AuthMIddlewareInterface } from '../interfaces/middleware.interface'

export class AuthMIddleware implements AuthMIddlewareInterface {
  execute (httpRequest: HttpRequest): HttpResponse {
    return forbidden(new AccessDeniedError())
  }
}
