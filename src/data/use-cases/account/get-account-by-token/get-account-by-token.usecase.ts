import { GetAccountByTokenUseCaseInterface } from '../../../../domain/use-cases/account/get-account-by-token.interface'
import { GetAccountByTokenRepositoryInterface } from '../../../interfaces/get-account-by-token-repository.interface'
import { AccountModel } from '../add-account'

export class GetAccountByTokenUseCase implements GetAccountByTokenUseCaseInterface {
  constructor (
    private readonly accountRepository: GetAccountByTokenRepositoryInterface
  ) {}

  async execute (token: string, role?: string): Promise<AccountModel> {
    const account = await this.accountRepository.getByToken(token)
    return account || null
  }
}
