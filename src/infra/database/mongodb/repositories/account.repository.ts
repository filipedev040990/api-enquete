import { AddAccountRepositoryInterface } from '../../../../data/interfaces/add-account-repository.interface'
import { AddAccountRequest } from '../../../../data/use-cases/add-account'
import { AccountModel } from '../../../../domain/models/account.model'
import { MongoHelper } from '../helpers/mongo.helper'
import { map } from '../helpers/mapping.helper'

export class AccountRepository implements AddAccountRepositoryInterface {
  async getByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (account) {
      return map(account)
    }
    return null
  }

  async create (accountData: AddAccountRequest): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const newAccount = await accountCollection.findOne({ _id: result.insertedId })
    return map(newAccount)
  }
}
