import jwt from 'jsonwebtoken'
import { ENV } from '../conf/conf'

export const verifyToken = (req, res, next) => {
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
