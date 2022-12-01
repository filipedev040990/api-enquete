import { AddAccountRequest } from '../../domain/use-cases/signup/add-account.interface'
import { AccountModel } from '../../domain/models/account.model'

export interface AccountRepositoryInterface {
  create (accountData: AddAccountRequest): Promise<AccountModel>
  getByEmail (email: string): Promise<AccountModel>
}
