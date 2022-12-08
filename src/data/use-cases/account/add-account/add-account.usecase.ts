import { AccountModel, AddAccountInterface, AddAccountRequest, AddAccountRepositoryInterface, HasherHashAdapterInterface } from './'

export class AddAccountUseCase implements AddAccountInterface {
  constructor (
    private readonly hasher: HasherHashAdapterInterface,
    private readonly addAccountRepository: AddAccountRepositoryInterface
  ) {}

  async execute (account: AddAccountRequest): Promise<AccountModel> {
    const { email, name, password } = account
    const passwordHashed = await this.hasher.hash(password)
    return await this.addAccountRepository.create({
      name,
      email,
      password: passwordHashed,
      token: ''
    })
  }
}
