import { GetAccountByEmailUseCase } from '@/data/use-cases/account/get-account-by-email/get-account-by-email.usecase'
import { GetAccountByEmailInterface } from '@/domain/use-cases/signup/get-account-by-email.interface'
import { AccountRepository } from '@/infra/database/mongodb/repositories/account/account.repository'

export const makeGetAccountByEmailUseCaseFactory = (): GetAccountByEmailInterface => {
  const accountRepository = new AccountRepository()
  return new GetAccountByEmailUseCase(accountRepository)
}
