import express from 'express'
import path from 'path'
import { readFileSync } from 'fs'

const router = express.Router()

const filePath = path.resolve('.') + '/data/toolbardefs.json'

const toolbardefs = JSON.parse(readFileSync(filePath))

router.get('/:tablename', (req, res) => {
    const { tablename } = req.params
    const defs = toolbardefs.filter(
        (def) => def.tab.toLoweCase() === tablename.toLowerCase()
    )
    res.send(defs)
})

export default router
