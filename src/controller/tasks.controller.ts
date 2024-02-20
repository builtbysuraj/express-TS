import connect from '../db'
import { Task } from '../model/task.modal'
import { User } from '../model/user.modal'

export const tasks = async (req, res) => {
  try {
    await connect()
    // req.user now contains the user's information from the token
    const userId = req.user.id

    // Check if the user exists in the database
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' })
    }
    const tasks = await Task.find({ user: user.id })
    res.json({
      success: true,
      tasks,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
