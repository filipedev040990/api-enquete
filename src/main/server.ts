import { app } from './app'
import { MongoHelper } from '../infra/database/mongodb/helpers/mongo.helper'
import env from './env'

const start = async (): Promise<any> => {
  try {
    await MongoHelper.connect(env.mongodb.mongoUrl)
    app.listen(env.server.port || 5050, () => console.log('Server running at http://localhost:5050'))
  } catch (error) {
    console.log(error)
  }
}

void start()
