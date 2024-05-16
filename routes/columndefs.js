import express from 'express'
import path from 'path'
import { readFileSync } from 'fs'

const router = express.Router()

const filePath = path.resolve('.') + '/data/columndefs.json'

const columndefs = JSON.parse(readFileSync(filePath))

router.get('/:tablename', (req, res) => {
    const { tablename } = req.params
    const foundDef = columndefs.filter((def) => def.tableName === tablename)
    res.send(foundDef)
})

export default router
