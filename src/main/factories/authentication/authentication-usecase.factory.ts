import { AuthenticationUseCaseInterface } from '../../../data/use-cases/authentication'
import { AuthenticationUseCase } from '../../../data/use-cases/authentication/authentication.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../../infra/database/mongodb/repositories/account/account.repository'
import { JwtAdapter } from '../../../infra/token/jwt.adapter'
import env from '../../env'

export const makeAuthenticationUseCaseFactory = (): AuthenticationUseCaseInterface => {
  const accountRepository = new AccountRepository()
  const hasher = new BcryptAdapter(env.hasher.salt)
  const encrypter = new JwtAdapter(env.encrypter.secretKey, env.encrypter.expiresIn)
  const tokenRepository = accountRepository
  return new AuthenticationUseCase(accountRepository, hasher, encrypter, tokenRepository)
}
