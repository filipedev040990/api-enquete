import { AccountModel } from '../../../domain/models/account.model'
import { AddAccountInterface, AddAccountRequest } from '../../../domain/use-cases/signup/add-account.interface'
import { EncrypterAdapterInterface } from '../../interfaces/encrypter-adapter.interface'

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
