import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy = { txt: '' }) {
    try {
        const criteria = {}
        const collection = await dbService.getCollection('car')
        var carCursor = await collection.find(criteria)
        const cars = carCursor.toArray()
        return cars
    } catch (err) {
        logger.error('cannot find cars', err)
        throw err
    }
}

async function getById(carId) {
    try {
        const collection = await dbService.getCollection('car')
        const car = collection.findOne({ _id: ObjectId(carId) })
        return car
    } catch (err) {
        logger.error(`while finding car ${carId}`, err)
        throw err
    }
}

async function remove(carId) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.deleteOne({ _id: ObjectId(carId) })
        return carId
    } catch (err) {
        logger.error(`cannot remove car ${carId}`, err)
        throw err
    }
}

async function add(car) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.insertOne(car)
        return car
    } catch (err) {
        logger.error('cannot insert car', err)
        throw err
    }
}

async function update(car) {
    try {
        const carToSave = {
            model: car.model,
            mark: car.mark,
            year: car.year,
            doors: car.doors,
            ac: car.ac,
            transmission: car.transmission,
            imgUrl: car.imgUrl,
            rentStart: car.rentStart,
            rentEnd: car.rentEnd,
            bids: car.bids,
        }
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ _id: ObjectId(car._id) }, { $set: carToSave })
        return car
    } catch (err) {
        logger.error(`cannot update car ${carId}`, err)
        throw err
    }
}

export const carService = {
    remove,
    query,
    getById,
    add,
    update,
}
