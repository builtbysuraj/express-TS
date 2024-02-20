import { Router } from 'express'
import { loginUser } from '../controller/login.controller'
import { logout } from '../controller/logout.controller'
import { newTask } from '../controller/newTask.controller'
import { registerUser } from '../controller/register.controller'
import { tasks } from '../controller/tasks.controller'
import { verifyToken } from '../utils/verifyToken'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/new-task').post(verifyToken, newTask)
router.route('/tasks').get(verifyToken, tasks)
router.route('/logout').get(logout)

export default router
