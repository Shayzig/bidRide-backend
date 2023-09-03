import express from 'express'
import { getUsers, getUserById, addUser, updateUser, removeUser } from './user.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)


export const userRoutes = router
