import { LogRepository } from '@/infra/database/mongodb/repositories/log/log.repository'
import { LogControllerDecorator } from '@/main/decorators/log.decorator'
import { ControllerInterface } from '@/presentation/interfaces'

export const makeLogDecoratorFactory = (controller: ControllerInterface): ControllerInterface => {
  const logRepository = new LogRepository()
  return new LogControllerDecorator(controller, logRepository)
}
