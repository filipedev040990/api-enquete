import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,

  async connect (uri: string) {
    this.connection = await MongoClient.connect(uri)
  },

  async disconnect () {
    this.connection.close()
  },

  getCollection (name: string): Collection {
    return this.connection.db().collection(name)
  }
}
