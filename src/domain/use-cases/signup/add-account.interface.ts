import { AccountModel } from '@/domain/models/account.model'

export type AddAccountRequest = {
  email: string
  name: string
  password: string
  token?: string
}

export interface AddAccountInterface {
  execute (account: AddAccountRequest): Promise<AccountModel>
}
