import { AccountModel } from '../../domain/models/account.model'

export interface GetAccountByTokenRepositoryInterface {
  getByToken (token: string): Promise<AccountModel | null>
}
