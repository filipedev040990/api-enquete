import { LogRepository } from '@/infra/database/mongodb/repositories/log/log.repository'
import { AuthenticationController } from '@/presentation/controllers/authentication/authentication.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { LogControllerDecorator } from '@/main/decorators/log.decorator'
import { makeAuthenticationValidationComposite } from './authentication-validatoin.factory'
import { makeAuthenticationUseCaseFactory } from './authentication-usecase.factory'

export const makeAuthenticationController = (): ControllerInterface => {
  const authenticationUseCase = makeAuthenticationUseCaseFactory()
  const authenticationController = new AuthenticationController(authenticationUseCase, makeAuthenticationValidationComposite())
  const logRepository = new LogRepository()
  return new LogControllerDecorator(authenticationController, logRepository)
}
