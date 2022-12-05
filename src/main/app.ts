import express, { Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use((req: Request, res: Response) => {
  res.status(404).json({})
})

export { app }
