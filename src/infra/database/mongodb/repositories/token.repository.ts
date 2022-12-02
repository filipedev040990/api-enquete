import { TokenRepositoryInterface, TokenRepositoryProps } from '../../../../data/interfaces/token-repository.interface'
import { MongoHelper } from '../helpers/mongo.helper'

export class TokenRepository implements TokenRepositoryInterface {
  async createOrUpdate (props: TokenRepositoryProps): Promise<void> {
    const tokenCollection = await MongoHelper.getCollection('token')
    const token = await tokenCollection.findOne({ account_id: props.account_id })
    if (!token) {
      await tokenCollection.insertOne({
        account_id: props.account_id,
        token: props.token
      })
    } else {
      await tokenCollection.updateOne(
        { account_id: props.account_id },
        {
          $set: { token: props.token }
        }
      )
    }
  }
}
