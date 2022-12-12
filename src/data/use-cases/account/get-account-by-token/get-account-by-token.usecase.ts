import { GetAccountByTokenUseCaseInterface } from '../../../../domain/use-cases/account/get-account-by-token.interface'
import { DecrypterAdapterInterface } from '../../../interfaces/decrypter.adapter.interface'
import { GetAccountByTokenRepositoryInterface } from '../../../interfaces/get-account-by-token-repository.interface'
import { AccountModel } from '../add-account'

export class GetAccountByTokenUseCase implements GetAccountByTokenUseCaseInterface {
  constructor (
    private readonly accountRepository: GetAccountByTokenRepositoryInterface,
    private readonly decrypter: DecrypterAdapterInterface
  ) {}

  async execute (token: string, role?: string): Promise<AccountModel> {
    const isValidToken = await this.decrypter.decrypt(token)
    if (isValidToken) {
      const account = await this.accountRepository.getByToken(token)
      if (account) {
        return account
      }
    }
    return null
  }
}
