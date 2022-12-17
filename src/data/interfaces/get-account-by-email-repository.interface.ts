import { AccountModel } from '@/domain/models/account.model'

export interface GetAccountByEmailRepositoryInterface {
  getByEmail (email: string): Promise<AccountModel | null>
}
