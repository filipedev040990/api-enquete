import { AuthenticationController } from '@/presentation/controllers/authentication/authentication.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { makeLogDecoratorFactory } from '../decorators'
import { makeAuthenticationUseCaseFactory } from '../usecases/authentication-usecase.factory'
import { makeAuthenticationValidationComposite } from './authentication-validation.factory'

export const makeAuthenticationController = (): ControllerInterface => {
  const authenticationController = new AuthenticationController(makeAuthenticationUseCaseFactory(), makeAuthenticationValidationComposite())
  return makeLogDecoratorFactory(authenticationController)
}
