import mongoose from 'mongoose'
import { ENV } from '../conf/conf'

const connect = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URL)
    console.log('MongoDb connected')
  } catch (error) {
    console.log('MONGODB connection Error')
  }
}

export default connect
