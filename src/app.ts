import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { ENV } from './conf/conf'
import router from './routes/user.routes'

const app = express()

app.use(
  cors({
    origin: [ENV.CLIENT_URL],
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

app.use('/api', router)

export default app
