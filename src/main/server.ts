import { app } from './app'
import { MongoHelper } from '../infra/database/mongodb/helpers/mongo.helper'
import env from './env'

const start = async (): Promise<any> => {
  try {
    await MongoHelper.connect(env.mongodb.mongoUrl)
    const port = env.server.port || 3000
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  } catch (error) {
    console.log(error)
  }
}

void start()
