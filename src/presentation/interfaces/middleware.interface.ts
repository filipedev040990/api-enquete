import { HttpRequest, HttpResponse } from './http.interface'

export interface AuthMiddlewareInterface {
  execute(httpRequest: HttpRequest): Promise<HttpResponse>
}
