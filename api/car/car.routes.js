import express from 'express'
import { getCars, getCarById, addCar, updateCar, removeCar } from './car.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', getCars)
router.get('/:id', getCarById)
router.post('/', addCar)
router.put('/:id', updateCar)
router.delete('/:id', removeCar)


export const carRoutes = router
