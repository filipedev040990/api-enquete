import { AuthenticationRequest, AuthenticationUseCaseInterface } from '../../../domain/use-cases/authentication/authentication.interface'
import { AccountRepositoryInterface } from '../../interfaces/account-repository.interface'
import { HasherAdapterInterface } from '../add-account'
export class AuthenticationUseCase implements AuthenticationUseCaseInterface {
  constructor (
    private readonly accountRepository: AccountRepositoryInterface,
    private readonly hasher: HasherAdapterInterface
  ) {}

  async execute (request: AuthenticationRequest): Promise<string> {
    const account = await this.accountRepository.getByEmail(request.email)
    if (account) {
      await this.hasher.compare(request.password, account.password)
    }
    return null
  }
}
