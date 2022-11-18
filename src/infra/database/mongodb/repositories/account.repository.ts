import { AccountRepositoryInterface } from '../../../../data/interfaces/account-repository.interface'
import { AddAccountRequest } from '../../../../data/use-cases/add-account'
import { AccountModel } from '../../../../domain/models/account.model'
import { MongoHelper } from '../helpers/mongo.helper'
import { map } from '../helpers/mapping.helper'

export class AccountRepository implements AccountRepositoryInterface {
  async create (accountData: AddAccountRequest): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const newAccount = await accountCollection.findOne({ _id: result.insertedId })
    return map(newAccount)
  }
}
