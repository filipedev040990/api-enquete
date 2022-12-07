import { AuthenticationRequest, AuthenticationUseCaseInterface, GetAccountByEmailRepositoryInterface, EncrypterAdapterInterface, TokenRepositoryInterface, HasherCompareAdapterInterface } from './'
export class AuthenticationUseCase implements AuthenticationUseCaseInterface {
  constructor (
    private readonly getAccountByEmailRepository: GetAccountByEmailRepositoryInterface,
    private readonly hasher: HasherCompareAdapterInterface,
    private readonly encrypter: EncrypterAdapterInterface,
    private readonly tokenRepository: TokenRepositoryInterface
  ) {}

  async execute (request: AuthenticationRequest): Promise<string> {
    const account = await this.getAccountByEmailRepository.getByEmail(request.email)
    if (account) {
      const isValidPassword = await this.hasher.compare(request.password, account.password)
      if (isValidPassword) {
        const token = await this.encrypter.encrypt({ account_id: account.id })
        await this.tokenRepository.updateToken({
          account_id: account.id,
          token
        })
        return token
      }
    }
    return null
  }
}
