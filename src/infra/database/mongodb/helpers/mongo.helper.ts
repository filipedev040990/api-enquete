import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,
  uri: null as string,

  async connect (uri: string) {
    this.uri = uri
    this.connection = await MongoClient.connect(uri)
  },

  async disconnect () {
    this.connection.close()
    this.connection = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.connection) {
      await this.connect(this.uri)
    }
    return this.connection.db().collection(name)
  }
}
