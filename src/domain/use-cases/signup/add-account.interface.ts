import { AccountModel } from './account.model'

export type AddAccountRequest = {
  email: string
  name: string
  password: string
}

export interface AddAccountInterface {
  execute (account: AddAccountRequest): Promise<AccountModel>
}
