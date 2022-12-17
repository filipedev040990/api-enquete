import { AccountModel } from '@/domain/models/account.model'

export interface GetAccountByEmailInterface {
  execute (email: string): Promise<AccountModel | null>
}
