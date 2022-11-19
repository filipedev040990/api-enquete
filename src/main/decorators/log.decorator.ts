import { ControllerInterface, HttpRequest, HttpResponse } from '../../presentation/interfaces'

export class LogControllerDecorator implements ControllerInterface {
  constructor (private readonly controller: ControllerInterface) {}
  async execute (request: HttpRequest): Promise<HttpResponse> {
    return await this.controller.execute(request)
  }
}
