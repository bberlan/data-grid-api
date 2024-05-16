import express from 'express'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { jsonStringify } from '../utils.js'

const router = express.Router()

const pathCars = path.resolve('.') + '/data/cars.json'

const cars = JSON.parse(readFileSync(pathCars))

const now = dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')

router.get('/', (req, res) => {
    res.send(cars)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const foundUser = cars.find((car) => car.id === id)
    res.send(foundUser)
})

router.post('/', (req, res) => {
    const car = req.body

    cars.push({ id: uuidv4(), ...car, DateCreated: now })

    writeFileSync(pathCars, jsonStringify(cars))

    res.send(`${car.first_name} has been added to the Database`)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    writeFileSync(pathCars, jsonStringify(cars.filter((car) => car.id !== id)))

    res.send(`${id} deleted successfully from database`)
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const dat = req.body
    const updatedCars = cars.map((car) => {
        if (user.id == id) {
            return {
                ...car,
                make: dat.make ?? car.make,
                model: dat.model ?? car.model,
                price: dat.price ?? car.price,
                electric: dat.electric ?? car.electric,
                dateReleased: dat.dateReleased ?? car.dateReleased,
                dateModified: now
            }
        }
        return user
    })

    writeFileSync(pathUsers, jsonStringify(updatedCars))

    res.send(`User with the ${id} has been updated`)
})

export default router
