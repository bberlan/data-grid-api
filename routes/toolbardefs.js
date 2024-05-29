import express from 'express'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import ToolbarDef from '../models/toolbardef.js'

const router = express.Router()
const filePath = path.resolve('.') + '/data/toolbardefs.json'
const tempPath = path.resolve('.') + '/data/toolbardefs.template.json'

router.get('/:tablename', (req, res) => {
    const { tablename } = req.params
    const toolbardefs = JSON.parse(readFileSync(filePath))
    const defs = toolbardefs.filter(
        (def) => def.tab.toLowerCase() === tablename.toLowerCase()
    )
    res.send(defs)
})

router.post('/generate/:tablename', (req, res) => {
    const { tablename } = req.params
    const toolbardefs = JSON.parse(readFileSync(filePath))
    const tempDefs = JSON.parse(readFileSync(tempPath))

    const newToolDefs = tempDefs.map(
        (def) =>
            toolbardefs.some(
                (def2) => def2.tab === tablename && def2.tool === def.tool
            ) ||
            new ToolbarDef({
                ...def,
                id: uuidv4(),
                tab: tablename,
                dateCreated: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')
            })
    )

    newToolDefs.forEach(
        (def) => typeof def === 'object' && toolbardefs.push(def)
    )
    // res.send(newToolDefs)
    writeFileSync(filePath, JSON.stringify(toolbardefs, null, 2))
    res.send(`ToolbarDefs for table ${tablename} generated.`)
})

export default router
