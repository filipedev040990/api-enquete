import { GetAccountByTokenUseCase } from '../../../data/use-cases/account/get-account-by-token/get-account-by-token.usecase'
import { AccountRepository } from '../../../infra/database/mongodb/repositories/account/account.repository'
import { JwtAdapter } from '../../../infra/token/jwt.adapter'
import { AuthMiddlewareInterface } from '../../../presentation/interfaces/middleware.interface'
import { AuthMiddleware } from '../../../presentation/middlewares/auth.middleware'
import env from '../../env'

export const makeAuthMiddleware = (role?: string): AuthMiddlewareInterface => {
  const getAccountByTokenRepository = new AccountRepository()
  const secretKey = env.encrypter.secretKey
  const decrypterAdapter = new JwtAdapter(secretKey)
  const getAccountByTokenUseCase = new GetAccountByTokenUseCase(getAccountByTokenRepository, decrypterAdapter)
  return new AuthMiddleware(getAccountByTokenUseCase, role)
}
