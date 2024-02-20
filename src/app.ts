import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { ENV } from './conf/conf'
import router from './routes/user.routes'

const app = express()

// app.use(cors())
// 👇️ specify origins to allow
const whitelist = ['http://localhost:5173', 'http://localhost:3000']

// ✅ Enable pre-flight requests
app.options('*', cors())

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

app.use('/api', router)

export default app
