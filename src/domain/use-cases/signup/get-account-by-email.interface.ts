import { AccountModel } from '../../models/account.model'

export interface GetAccountByEmailInterface {
  execute (email: string): Promise<AccountModel | null>
}
