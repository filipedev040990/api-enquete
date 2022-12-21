import SignupController from '@/presentation/controllers/singup/signup.controller'
import { ControllerInterface } from '@/presentation/interfaces'
import { makeAuthenticationUseCaseFactory } from '@/main/factories/usecases/authentication-usecase.factory'
import { makeSignupValidationComposite } from './signup-validation.factory'
import { makeAddAccountUseCaseFactory } from '../usecases'
import { makeGetAccountByEmailUseCaseFactory } from '@/main/factories/usecases'
import { makeLogDecoratorFactory } from '../decorators'

export const makeSignupControler = (): ControllerInterface => {
  const signupController = new SignupController(makeAddAccountUseCaseFactory(), makeSignupValidationComposite(), makeGetAccountByEmailUseCaseFactory(), makeAuthenticationUseCaseFactory())
  return makeLogDecoratorFactory(signupController)
}
