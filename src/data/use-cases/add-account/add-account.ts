import { AccountModel, AddAccountInterface, AddAccountRequest, EncrypterAdapterInterface } from './'

export class AddAccountUseCase implements AddAccountInterface {
  constructor (
    private readonly encrypter: EncrypterAdapterInterface
  ) {}

  async execute (account: AddAccountRequest): Promise<AccountModel> {
    const { password } = account
    await this.encrypter.hash(password)
    return null
  }
}
