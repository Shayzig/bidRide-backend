import { carService } from './car.service.js'
import { logger } from '../../services/logger.service.js'

export async function getCars(req, res) {
  try {
    logger.debug('Getting Cars:', req.query)
    const filterBy = {}
    const cars = await carService.query(filterBy)
    res.json(cars)
  } catch (err) {
    logger.error('Failed to get cars', err)
    res.status(400).send({ err: 'Failed to get cars' })
  }
}

export async function getCarById(req, res) {
  try {
    const carId = req.params.id
    const car = await carService.getById(carId)
    res.json(car)
  } catch (err) {
    logger.error('Failed to get car', err)
    res.status(400).send({ err: 'Failed to get car' })
  }
}

export async function addCar(req, res) {
  const { loggedinUser } = req

  try {
    const car = req.body
    const addedCar = await carService.add(car)
    res.json(addedCar)
  } catch (err) {
    logger.error('Failed to add car', err)
    res.status(400).send({ err: 'Failed to add car' })
  }
}

export async function updateCar(req, res) {
  try {
    const car = req.body
    const updatedCar = await carService.update(car)
    console.log(updatedCar);
    res.json(updatedCar)
  } catch (err) {
    logger.error('Failed to update car', err)
    res.status(400).send({ err: 'Failed to update car' })

  }
}

export async function removeCar(req, res) {
  try {
    const carId = req.params.id
    const removedId = await carService.remove(carId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove car', err)
    res.status(400).send({ err: 'Failed to remove car' })
  }
}




