import express from 'express'
import path from 'path'
import { readFileSync } from 'fs'
import ColumnDefDto from '../dtos/ColumnDefDto.js'
import { jsonStringify } from '../utils.js'

const router = express.Router()

const filePath = path.resolve('.') + '/data/columndefs.json'

const columndefs = JSON.parse(readFileSync(filePath))

router.get('/:tablename', (req, res) => {
    const { tablename } = req.params
    const defs = columndefs.filter(
        (def) => def.tableName.toLowerCase() === tablename.toLowerCase()
    )

    res.send(defs.map((def) => new ColumnDefDto(def)))
})

export default router
