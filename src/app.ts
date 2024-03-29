import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { ENV } from './conf/conf'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

import router from './routes/user.routes'
app.use('/api', router)

export default app
