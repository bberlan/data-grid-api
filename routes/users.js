import express from 'express'
import { readFileSync, writeFileSync, appendFileSync } from 'fs'
// import users from '../data/users.json'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

const pathUsers = path.resolve('.') + '/data/users.json'

const users = JSON.parse(readFileSync(pathUsers))
// const users = []

router.get('/', (req, res) => {
    res.send(users)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const foundUser = users.find((user) => user.id === id)
    res.send(foundUser)
})

// readFile(path.resolve('.') + '/data/users.json', function (err, data) {
//   // Getting the list of users from the mock database
//   router.get('/', (req, res) => {
//     res.send(JSON.parse(data))
//   })
// })

router.post('/', (req, res) => {
    const user = req.body

    users.push({ id: uuidv4(), ...user })

    writeFileSync(pathUsers, JSON.stringify(users, null, 2))

    res.send(`${user.first_name} has been added to the Database`)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    writeFileSync(
        pathUsers,
        JSON.stringify(
            users.filter((user) => user.id !== id),
            null,
            2
        )
    )

    res.send(`${id} deleted successfully from database`)
})

router.patch('/:id', (req, res) => {
    const { id } = req.params

    const { first_name, last_name, email } = req.body

    // const user = users.find((user) => user.id === id)

    // if (first_name) user.first_name = first_name
    // if (last_name) user.last_name = last_name
    // if (email) user.email = email

    const updatedUsers = users.map((user) => {
        if (user.id == id) {
            return {
                ...user,
                first_name: first_name ?? user.first_name,
                last_name: last_name ?? user.last_name,
                email: email ?? user.email
            }
        }
        return user
    })

    writeFileSync(pathUsers, JSON.stringify(updatedUsers, null, 2))

    res.send(`User with the ${id} has been updated`)
})

export default router
