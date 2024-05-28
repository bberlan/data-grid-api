import express from 'express'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import ColumnDefDto from '../dtos/ColumnDefDto.js'
import ColumnDef from '../models/columndef.js'
import { headerName } from '../utils.js'

const router = express.Router()
const filePath = path.resolve('.') + '/data/columndefs.json'

router.get('/:tablename', (req, res) => {
    const { tablename } = req.params
    const columndefs = JSON.parse(readFileSync(filePath))
    const defs = columndefs.filter(
        (def) => def.tableName.toLowerCase() === tablename.toLowerCase()
    )

    res.send(defs.map((def) => new ColumnDefDto(def)))
})

router.post('/generate/:tablename', (req, res) => {
    const { tablename } = req.params
    const obj = req.body
    const columndefs = JSON.parse(readFileSync(filePath))

    const newColDefs = Object.keys(obj).map(
        (key, i) =>
            columndefs.some(
                (def) => def.tableName === tablename && def.field === key
            ) ||
            new ColumnDef({
                id: uuidv4(),
                columnOrder: (i + 1) * 5,
                tableName: tablename,
                headerName: headerName(key),
                field: key,
                sortable: true,
                filter: true,
                resizable: true,
                editable: true
            })
    )
    newColDefs.some((def) => def === true) ||
        newColDefs.unshift(
            new ColumnDef({
                id: uuidv4(),
                columnOrder: 0,
                tableName: tablename,
                headerName: '',
                field: 'select',
                sortable: false,
                filter: false,
                resizable: false,
                editable: true,
                checkboxSelection: true,
                headerCheckboxSelection: true,
                width: 50
            })
        )
    // res.send(newColDefs)
    newColDefs.forEach(
        (def) =>
            typeof def === 'object' &&
            columndefs.push({
                ...def,
                dateCreated: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')
            })
    )
    writeFileSync(filePath, JSON.stringify(columndefs, null, 2))
    res.send(`ColumnDefs for table ${tablename} generated.`)
})

export default router
