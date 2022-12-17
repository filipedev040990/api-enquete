import { AccountModel } from '@/domain/models/account.model'

export interface GetAccountByTokenUseCaseInterface {
  execute(token: string, role?: string): Promise<AccountModel | null>
}
