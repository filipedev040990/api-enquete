import { AccountRepositoryInterface } from '../../../../data/interfaces/account-repository.interface'
import { AddAccountRequest } from '../../../../data/use-cases/add-account'
import { AccountModel } from '../../../../domain/models/account.model'

export class AccountRepository implements AccountRepositoryInterface {
  async create (account: AddAccountRequest): Promise<AccountModel> {
    return null
  }
}
