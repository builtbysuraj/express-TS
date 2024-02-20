import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ENV } from '../conf/conf'
import connect from '../db'
import { User } from '../model/user.modal'

export const loginUser = async (req, res) => {
  try {
    await connect()
    const { name, pass } = req.body

    const user = await User.findOne({ name })
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' })
    }
    // Check password
    // const validPassword = await bcryptjs.compare(pass, user.pass)
    // if (!validPassword) {
    //   return res.status(400).json({ error: 'Invalid password' })
    // }

    // Create token data for JWT
    const tokenData = {
      id: user._id,
      name: user.name,
    }

    // Create token with JWT
    const token = await jwt.sign(tokenData, ENV.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    return res.json({
      message: 'Login successful',
      success: true,
      token,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
