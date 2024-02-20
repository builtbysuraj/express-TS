import app from './app'
import connect from './db'

const PORT = process.env.PORT || 4000
connect()
  .then(() => {
    app.listen(PORT, () => console.log('listen on port ' + PORT))
  })
  .catch((err) => {
    console.log('MongoDb connection Error ' + err)
  })
