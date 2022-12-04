import { AccountModel } from '../../../domain/models/account.model'
import { GetAccountByEmailInterface } from '../../../domain/use-cases/signup/get-account-by-email.interface'
import { GetAccountByEmailRepositoryInterface } from '../authentication'

export class GetAccountByEmailUseCase implements GetAccountByEmailInterface {
  constructor (private readonly getAccountByEmailRepository: GetAccountByEmailRepositoryInterface) {}
  async execute (email: string): Promise<AccountModel | null> {
    const account = await this.getAccountByEmailRepository.getByEmail(email)
    return account || null
  }
}
