import { GetAccountByTokenUseCase } from '@/data/use-cases/account/get-account-by-token/get-account-by-token.usecase'
import { GetAccountByTokenUseCaseInterface } from '@/domain/use-cases/account/get-account-by-token.interface'
import { AccountRepository } from '@/infra/database/mongodb/repositories/account/account.repository'
import { JwtAdapter } from '@/infra/token/jwt.adapter'
import env from '@/main/env'

export const makeGetAccountByTokenUseCaseFactory = (): GetAccountByTokenUseCaseInterface => {
  const getAccountByTokenRepository = new AccountRepository()
  const secretKey = env.encrypter.secretKey
  const decrypterAdapter = new JwtAdapter(secretKey)
  return new GetAccountByTokenUseCase(getAccountByTokenRepository, decrypterAdapter)
}
