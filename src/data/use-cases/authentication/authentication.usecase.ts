import { AuthenticationRequest, AuthenticationUseCaseInterface } from '../../../domain/use-cases/authentication/authentication.interface'
import { AccountRepositoryInterface } from '../../interfaces/account-repository.interface'

export class AuthenticationUseCase implements AuthenticationUseCaseInterface {
  constructor (
    private readonly accountRepository: AccountRepositoryInterface
  ) {}

  async execute (request: AuthenticationRequest): Promise<string> {
    await this.accountRepository.getByEmail(request.email)
    return null
  }
}
