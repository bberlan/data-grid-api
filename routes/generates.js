import express from 'express'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import ColumnDefDto from '../dtos/ColumnDefDto.js'
import ColumnDef from '../models/columndef.js'
import { headerName } from '../utils.js'

const router = express.Router()
const colPath = path.resolve('.') + '/data/columndefs.json'
const toolPath = path.resolve('.') + '/data/toolbardefs.json'
const tempPath = path.resolve('.') + '/data/toolbardefs.template.json'
const tabPath = (tab) => path.resolve('.') + `/data/${tab}.json`

router.post('/:tablename', (req, res) => {
    const { tablename } = req.params
    const obj = req.body

    genColDefs(tablename, obj)
    genToolDefs(tablename)
    genRowData(tablename, obj)

    res.send(
        `ColumnDefs, ToolbarDefs and RowData for Table ${tablename} is generated.`
    )
})

const genColDefs = (tab, obj) => {
    const newColDefs = Object.keys(obj).map(
        (key, i) =>
            new ColumnDef({
                id: uuidv4(),
                columnOrder: (i + 1) * 5,
                tableName: tab,
                headerName: headerName(key),
                field: key,
                sortable: true,
                filter: true,
                resizable: true,
                editable: true
            })
    )
    newColDefs.unshift(
        new ColumnDef({
            id: uuidv4(),
            columnOrder: 0,
            tableName: tab,
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
    const columndefs = JSON.parse(readFileSync(filePath))
    newColDefs.forEach((def) =>
        columndefs.push({
            ...def,
            dateCreated: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')
        })
    )
    writeFileSync(colPath, JSON.stringify(columndefs, null, 2))
}

const genToolDefs = (tab) => {
    const toolbardefs = JSON.parse(readFileSync(toolPath))
    const tempDefs = JSON.parse(readFileSync(tempPath))

    const newToolDefs = tempDefs.map(
        (def) =>
            toolbardefs.some(
                (def2) => def2.tab === tab && def2.tool === def.tool
            ) ||
            new ToolbarDef({
                ...def,
                id: uuidv4(),
                tab: tab,
                dateCreated: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')
            })
    )

    newToolDefs.forEach(
        (def) => typeof def === 'object' && toolbardefs.push(def)
    )
    // res.send(newToolDefs)
    writeFileSync(toolPath, JSON.stringify(toolbardefs, null, 2))
}

const genRowData = (tab, obj) => {
    const data = existsSync(tabPath(tab))
        ? JSON.parse(readFileSync(tabPath(tab)))
        : []

    data.push({
        ...obj,
        id: obj.id ?? uuidv4(),
        dateCreated: dayjs().format('YYYY-MM-DD hh:mm:ss.SSS')
    })

    writeFileSync(tabPath(tab), JSON.stringify(data, null, 2))
}

export default router
