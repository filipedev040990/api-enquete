import { AccountModel } from '../models/account.model'

export type AddAccountRequest = {
  email: string
  name: string
  password: string
}

export interface AddAccountInterface {
  execute (account: AddAccountRequest): Promise<AccountModel>
}
