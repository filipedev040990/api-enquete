
import { AddAccountUseCase } from '../../../data/use-cases/add-account/add-account.usecase'
import { GetAccountByEmailUseCase } from '../../../data/use-cases/add-account/get-account-by-email.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../../infra/database/mongodb/repositories/account.repository'
import { LogRepository } from '../../../infra/database/mongodb/repositories/log.repository'
import SignupController from '../../../presentation/controllers/singup/signup.controller'
import { ControllerInterface } from '../../../presentation/interfaces'
import { LogControllerDecorator } from '../../decorators/log.decorator'
import env from '../../env'
import { makeAuthenticationUseCaseFactory } from '../authentication/authentication-usecase.factory'
import { makeSignupValidationComposite } from './signup-validation.factory'

export const makeSignupControler = (): ControllerInterface => {
  const accountRepository = new AccountRepository()
  const hasher = new BcryptAdapter(env.hasher.salt)
  const authenticationUseCase = makeAuthenticationUseCaseFactory()
  const logRepository = new LogRepository()
  const addAccount = new AddAccountUseCase(hasher, accountRepository)
  const getAccountByEmail = new GetAccountByEmailUseCase(accountRepository)
  const signupController = new SignupController(addAccount, makeSignupValidationComposite(), getAccountByEmail, authenticationUseCase)
  return new LogControllerDecorator(signupController, logRepository)
}
