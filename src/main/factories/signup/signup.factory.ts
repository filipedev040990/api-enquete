
import { AddAccountUseCase } from '../../../data/use-cases/add-account/add-account.usecase'
import { GetAccountByEmailUseCase } from '../../../data/use-cases/add-account/get-account-by-email.usecase'
import { AuthenticationUseCase } from '../../../data/use-cases/authentication/authentication.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../../infra/database/mongodb/repositories/account.repository'
import { LogRepository } from '../../../infra/database/mongodb/repositories/log.repository'
import { TokenRepository } from '../../../infra/database/mongodb/repositories/token.repository'
import { JwtAdapter } from '../../../infra/token/jwt.adapter'
import SignupController from '../../../presentation/controllers/singup/signup.controller'
import { ControllerInterface } from '../../../presentation/interfaces'
import { LogControllerDecorator } from '../../decorators/log.decorator'
import env from '../../env'
import { makeSignupValidationComposite } from './signup-validation.factory'

export const makeSignupControler = (): ControllerInterface => {
  const hasher = new BcryptAdapter(env.hasher.salt)
  const accountRepository = new AccountRepository()
  const addAccount = new AddAccountUseCase(hasher, accountRepository)
  const getAccountByEmail = new GetAccountByEmailUseCase(accountRepository)
  const encrypter = new JwtAdapter(env.encrypter.secretKey, env.encrypter.expiresIn)
  const tokenRepository = new TokenRepository()
  const authenticationUseCase = new AuthenticationUseCase(accountRepository, hasher, encrypter, tokenRepository)
  const signupController = new SignupController(addAccount, makeSignupValidationComposite(), getAccountByEmail, authenticationUseCase)
  const logRepository = new LogRepository()
  return new LogControllerDecorator(signupController, logRepository)
}
