import { HttpRequest, HttpResponse } from './http.interface'

export interface AuthMIddlewareInterface {
  execute(httpRequest: HttpRequest): HttpResponse
}
