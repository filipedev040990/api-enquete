import { LogRepositoryInterface } from '@/data/interfaces/log-repository.interface'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'

export class LogRepository implements LogRepositoryInterface {
  async logError (stack: string): Promise<void> {
    const logCollection = await MongoHelper.getCollection('errors')
    await logCollection.insertOne({ stack })
  }
}
