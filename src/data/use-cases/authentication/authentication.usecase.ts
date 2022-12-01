import { AuthenticationRequest, AuthenticationUseCaseInterface, AccountRepositoryInterface, EncrypterAdapterInterface, HasherAdapterInterface, TokenRepositoryInterface } from './'
export class AuthenticationUseCase implements AuthenticationUseCaseInterface {
  constructor (
    private readonly accountRepository: AccountRepositoryInterface,
    private readonly hasher: HasherAdapterInterface,
    private readonly encrypter: EncrypterAdapterInterface,
    private readonly tokenRepository: TokenRepositoryInterface
  ) {}

  async execute (request: AuthenticationRequest): Promise<string> {
    const account = await this.accountRepository.getByEmail(request.email)
    if (account) {
      const isValidPassword = await this.hasher.compare(request.password, account.password)
      if (isValidPassword) {
        const token = await this.encrypter.encrypt(account.id)
        await this.tokenRepository.createOrUpdate({
          account_id: account.id,
          token
        })
        return token
      }
    }
    return null
  }
}
