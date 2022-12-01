import { AccountRepositoryInterface } from '../../interfaces/account-repository.interface'
import { AccountModel, AddAccountInterface, AddAccountRequest, HasherAdapterInterface } from './'

export class AddAccountUseCase implements AddAccountInterface {
  constructor (
    private readonly hasher: HasherAdapterInterface,
    private readonly accountRepository: AccountRepositoryInterface
  ) {}

  async execute (account: AddAccountRequest): Promise<AccountModel> {
    const { email, name, password } = account
    const passwordHashed = await this.hasher.hash(password)
    return await this.accountRepository.create({
      name,
      email,
      password: passwordHashed
    })
  }
}
