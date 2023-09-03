import { userService } from './user.service.js'
import { logger } from '../../services/logger.service.js'

export async function getUsers(req, res) {
  try {
    logger.debug('Getting Users:', req.query)
    const filterBy = {}
    const users = await userService.query(filterBy)
    res.json(users)
  } catch (err) {
    logger.error('Failed to get users', err)
    res.status(400).send({ err: 'Failed to get users' })
  }
}

export async function getUserById(req, res) {
  try {
    const userId = req.params.id
    const user = await userService.getById(userId)
    res.json(user)
  } catch (err) {
    logger.error('Failed to get user', err)
    res.status(400).send({ err: 'Failed to get user' })
  }
}

export async function addUser(req, res) {
  const { loggedinUser } = req

  try {
    const user = req.body
    const addedUser = await userService.add(user)
    res.json(addedUser)
  } catch (err) {
    logger.error('Failed to add user', err)
    res.status(400).send({ err: 'Failed to add user' })
  }
}

export async function updateUser(req, res) {
  try {
    const user = req.body
    const updatedUser = await userService.update(user)
    res.json(updatedUser)
  } catch (err) {
    logger.error('Failed to update user', err)
    res.status(400).send({ err: 'Failed to update user' })

  }
}

export async function removeUser(req, res) {
  try {
    const userId = req.params.id
    const removedId = await userService.remove(userId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove user', err)
    res.status(400).send({ err: 'Failed to remove user' })
  }
}




