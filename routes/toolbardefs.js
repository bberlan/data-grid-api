import express from 'express'
import path from 'path'
import { readFileSync } from 'fs'

const router = express.Router()

const filePath = path.resolve('.') + '/data/toolbardefs.json'

const toolbardefs = JSON.parse(readFileSync(filePath))

router.get('/:tablename', (req, res) => {
    const { tablename } = req.params
    const foundDef = toolbardefs.filter((def) => def.tab === tablename)
    res.send(foundDef)
})

export default router
