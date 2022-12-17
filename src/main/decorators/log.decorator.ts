import { LogRepositoryInterface } from '@/data/interfaces/log-repository.interface'
import { ControllerInterface, HttpRequest, HttpResponse } from '@/presentation/interfaces'
import { logger } from '@/infra/logger/logger'

export class LogControllerDecorator implements ControllerInterface {
  constructor (
    private readonly controller: ControllerInterface,
    private readonly logRepository: LogRepositoryInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.execute(request)
    if (httpResponse.statusCode === 500) {
      logger.error(httpResponse.body.stack)
      await this.logRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
