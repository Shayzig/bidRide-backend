import {dbService} from '../../services/db.service.js'
import {logger} from '../../services/logger.service.js'
import mongodb from 'mongodb'
const {ObjectId} = mongodb

async function query(filterBy={txt:''}) {
    try {
        const criteria = {}
        const collection = await dbService.getCollection('user')
        var userCursor = await collection.find(criteria)
        const users = userCursor.toArray()
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = collection.findOne({ _id: ObjectId(userId) })
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId(userId) })
        return userId
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.insertOne(user)
        return user
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            vendor: user.vendor,
            price: user.price
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: ObjectId(user._id) }, { $set: userToSave })
        return user
    } catch (err) {
        logger.error(`cannot update user ${userId}`, err)
        throw err
    }
}

export const userService = {
    remove,
    query,
    getById,
    add,
    update,
}
