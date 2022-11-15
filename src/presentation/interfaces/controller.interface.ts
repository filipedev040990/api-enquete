import { HttpRequest, HttpResponse } from './http.interface'

export interface ControllerInterface {
  execute (request: HttpRequest): Promise<HttpResponse>
}
