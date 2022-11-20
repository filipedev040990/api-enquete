import { AccountRepositoryInterface } from '../../interfaces/account-repository.interface'
import { AccountModel, AddAccountInterface, AddAccountRequest, EncrypterAdapterInterface } from './'

export class AddAccountUseCase implements AddAccountInterface {
  constructor (
    private readonly encrypter: EncrypterAdapterInterface,
    private readonly accountRepository: AccountRepositoryInterface
  ) {}

  async execute (account: AddAccountRequest): Promise<AccountModel> {
    const { email, name, password } = account
    const passwordHashed = await this.encrypter.hash(password)
    return await this.accountRepository.create({
      name,
      email,
      password: passwordHashed
    })
  }
}
