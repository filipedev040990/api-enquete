import { AuthenticationUseCase } from '../../../data/use-cases/authentication/authentication.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../../infra/database/mongodb/repositories/account.repository'
import { LogRepository } from '../../../infra/database/mongodb/repositories/log.repository'
import { AuthenticationController } from '../../../presentation/controllers/authentication/authentication.controller'
import { ControllerInterface } from '../../../presentation/interfaces'
import { LogControllerDecorator } from '../../decorators/log.decorator'
import { makeAuthenticationValidationComposite } from './authentication-validatoin.factory'
import env from '../../env'
import { JwtAdapter } from '../../../infra/token/jwt.adapter'
import { TokenRepository } from '../../../infra/database/mongodb/repositories/token.repository'

export const makeAuthenticationController = (): ControllerInterface => {
  const accountRepository = new AccountRepository()
  const hasher = new BcryptAdapter(env.hasher.salt)
  const encrypter = new JwtAdapter(env.encrypter.secretKey, env.encrypter.expiresIn)
  const tokenRepository = new TokenRepository()
  const authenticationUseCase = new AuthenticationUseCase(accountRepository, hasher, encrypter, tokenRepository)
  const authenticationController = new AuthenticationController(authenticationUseCase, makeAuthenticationValidationComposite())
  const logRepository = new LogRepository()
  return new LogControllerDecorator(authenticationController, logRepository)
}
