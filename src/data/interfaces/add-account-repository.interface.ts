import { AddAccountRequest } from '@/domain/use-cases/signup/add-account.interface'
import { AccountModel } from '@/domain/models/account.model'

export interface AddAccountRepositoryInterface {
  create (accountData: AddAccountRequest): Promise<AccountModel>
}
