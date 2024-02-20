import jwt from 'jsonwebtoken'
import { ENV } from '../conf/conf'
import connect from '../db'

export const verifyToken = async (req, res, next) => {
  await connect()
  // console.log(req)
  const token = req.cookies.token

  if (!token) {
    return res.status(403).json({ error: 'Access Denied' })
  }

  try {
    const verified = jwt.verify(token, ENV.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ error: 'Token is not valid' })
  }
}
