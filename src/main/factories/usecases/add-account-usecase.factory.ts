import { AddAccountUseCase } from '@/data/use-cases/account/add-account'
import { AddAccountInterface } from '@/domain/use-cases/signup/add-account.interface'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountRepository } from '@/infra/database/mongodb/repositories/account/account.repository'
import env from '@/main/env'

export const makeAddAccountUseCaseFactory = (): AddAccountInterface => {
  const accountRepository = new AccountRepository()
  const hasher = new BcryptAdapter(env.hasher.salt)
  return new AddAccountUseCase(hasher, accountRepository)
}
