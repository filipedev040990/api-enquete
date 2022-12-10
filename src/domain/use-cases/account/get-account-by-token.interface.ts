import { AccountModel } from '../../models/account.model'

export interface GetAccountByTokenUseCaseInterface {
  execute(token: string): Promise<AccountModel | null>
}
