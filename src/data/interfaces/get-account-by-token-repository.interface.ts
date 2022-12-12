import { AccountModel } from '../../domain/models/account.model'

export interface GetAccountByTokenRepositoryInterface {
  getByToken (token: string, role?: string): Promise<AccountModel | null>
}
