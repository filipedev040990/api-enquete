import { AddAccountRepositoryInterface } from '../../../../../data/interfaces/add-account-repository.interface'
import { AccountModel } from '../../../../../domain/models/account.model'
import { MongoHelper } from '../../helpers/mongo.helper'
import { map } from '../../helpers/mapping.helper'
import { GetAccountByEmailRepositoryInterface } from '../../../../../data/interfaces/get-account-by-email-repository.interface'
import { TokenRepositoryInterface, TokenRepositoryProps } from '../../../../../data/use-cases/authentication'
import { AddAccountRequest } from '../../../../../data/use-cases/account/add-account'
import { GetAccountByTokenRepositoryInterface } from '../../../../../data/interfaces/get-account-by-token-repository.interface'

export class AccountRepository implements AddAccountRepositoryInterface, GetAccountByEmailRepositoryInterface, TokenRepositoryInterface, GetAccountByTokenRepositoryInterface {
  async create (accountData: AddAccountRequest): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const newAccount = await accountCollection.findOne({ _id: result.insertedId })
    return map(newAccount)
  }

  async getByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (account) {
      return map(account)
    }
    return null
  }

  async updateToken (props: TokenRepositoryProps): Promise<void> {
    const tokenCollection = await MongoHelper.getCollection('accounts')
    await tokenCollection.updateOne(
      { _id: props.account_id },
      {
        $set: { token: props.token }
      }
    )
  }

  async getByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      {
        token,
        $or: [{
          role
        }, {
          role: 'admin'
        }]

      }
    )
    if (account) {
      return map(account)
    }
    return null
  }
}
