import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { jsonStringify } from '../utils.js'

const router = express.Router()
const filePath = (tab) => path.resolve('.') + `/data/${tab}.json`

router.get('/:tab', (req, res) => {
    const { tab } = req.params
    const data = JSON.parse(readFileSync(filePath(tab)))
    res.send(data)
})

router.get('/:tab/defaults', (req, res) => {
    const { tab } = req.params
    const data = JSON.parse(readFileSync(filePath(tab.concat('.template'))))
    // const foundData = data.find((obj) => obj.id === null)

    const defaultData = { ...data, id: uuidv4() }

    res.send(defaultData)
})

router.get('/:tab/:id', (req, res) => {
    const { tab, id } = req.params
    const data = JSON.parse(readFileSync(filePath(tab)))
    const foundData = data.find((obj) => obj.id === id)
    res.send(foundData)
})

router.post('/:tab', (req, res) => {
    const body = req.body
    const { tab } = req.params

    const data = existsSync(filePath(tab))
        ? JSON.parse(readFileSync(filePath(tab)))
        : []

    data.push({
        ...body,
        id: body.id ?? uuidv4(),
        dateCreated: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')
    })

    writeFileSync(filePath(tab), JSON.stringify(data, null, 2))

    res.send(`Id ${body.id} has been added to the Database`)
})

router.delete('/:tab/:id', (req, res) => {
    const { tab, id } = req.params
    const data = JSON.parse(readFileSync(filePath(tab)))

    writeFileSync(
        filePath(tab),
        JSON.stringify(
            data.filter((obj) => obj.id !== id),
            null,
            2
        )
    )

    res.send(`${id} deleted successfully from database`)
})

router.patch('/:tab/:id', (req, res) => {
    const { tab, id } = req.params
    const body = req.body
    const data = JSON.parse(readFileSync(filePath(tab)))

    const updatedData = data.map((obj) => {
        if (obj.id === id) {
            for (const prop in obj) {
                if (body[prop] !== undefined) {
                    obj[prop] = body[prop]
                }
            }
            return {
                ...obj,
                dateModified: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')
            }
        }
        return obj
    })

    writeFileSync(filePath(tab), JSON.stringify(updatedData, null, 2))

    res.send(`${tab} with Id ${id} has been updated`)
})

export default router
