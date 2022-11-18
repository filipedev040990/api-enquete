import express from 'express'
import cors from 'cors'
import SetupRoute from './routes'

const app = express()

app.use(cors())
app.use(express.json())
SetupRoute(app)

export { app }
