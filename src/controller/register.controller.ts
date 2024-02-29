import jwt from 'jsonwebtoken'
import { ENV } from '../conf/conf'
import connect from '../db'
import { User } from '../model/user.modal'

export const registerUser = async (req, res) => {
  try {
    await connect()
    const { name, pass } = req.body
    // console.log(name, pass)

    const user = await User.findOne({ name })
    if (user) {
      return res.status(400).json({ data: 'User already exists' })
    }
    const newUser = new User({
      name,
      pass,
    })
    const savedUser = await newUser.save()

    const tokenData = {
      id: savedUser._id,
      // name: savedUser.name,
    }

    // Create token with JWT
    const token = await jwt.sign(tokenData, ENV.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      // sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
    })
    return res.json({ message: 'User registered successfully', token })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'An error occurred while registering the user' })
  }
}
