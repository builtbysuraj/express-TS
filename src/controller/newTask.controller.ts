import connect from '../db'
import { Task } from '../model/task.modal'
import { User } from '../model/user.modal'

export const newTask = async (req, res) => {
 await connect()
  // req.user now contains the user's information from the token
  const userId = req.user.id

  // Check if the user exists in the database
  const user = await User.findById(userId)
  if (!user) {
    return res.status(400).json({ error: 'User does not exist' })
  }

  // Add the new task
  const { title } = req.body
  const newTask = new Task({
    title,
    user: userId,
  })

  try {
    const savedTask = await newTask.save()
    return res.json({ message: 'Task added successfully', task: savedTask })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
