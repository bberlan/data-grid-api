import express from 'express'
import path from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import ColumnDef from '../models/columndef.js'
import ToolbarDef from '../models/toolbardef.js'
import { headerName } from '../utils.js'

const router = express.Router()
const colPath = path.resolve('.') + '/data/columndefs.json'
const toolPath = path.resolve('.') + '/data/toolbardefs.json'
const tempPath = path.resolve('.') + '/data/toolbardefs.template.json'
const tabPath = (tab) => path.resolve('.') + `/data/${tab}.json`
const defaultCellRenderer = (value) => {
    switch (typeof value) {
        case 'boolean':
            return 'checkboxCellRenderer'
        default:
            return undefined
    }
}
const defaultCellEditor = (value) => {
    switch (typeof value) {
        case 'boolean':
            return 'checkboxCellEditor'
        case 'string': {
            if (dayjs(value).isValid()) return 'agDateStringCellEditor'
        }
        default:
            return undefined
    }
}

router.post('/:tablename', (req, res) => {
    const { tablename } = req.params
    const obj = req.body

    genColDefs(tablename, obj)
    genToolDefs(tablename)
    genRowData(tablename, obj)
    genTemplateData(tablename, obj)
    genSamples(tablename)

    res.send(
        `ColumnDefs, ToolbarDefs and RowData for Table ${tablename} is generated.`
    )
})

const genColDefs = (tab, obj) => {
    const columndefs = JSON.parse(readFileSync(colPath))
    const count =
        columndefs.filter(
            (def) => def.tableName === tab && def.field !== 'select'
        ).length + 1
    const newColDefs = Object.entries(obj).map(
        ([key, value], i) =>
            columndefs.some(
                (def) => def.tableName === tab && def.field === key
            ) ||
            new ColumnDef({
                id: uuidv4(),
                columnOrder: (count + i) * 5,
                tableName: tab,
                headerName: headerName(key),
                field: key,
                sortable: true,
                filter: true,
                resizable: true,
                editable: true,
                cellRenderer: defaultCellRenderer(value),
                cellEditor: defaultCellEditor(value)
            })
    )
    if (
        !columndefs.some(
            (def) => def.tableName === tab && def.field === 'select'
        )
    ) {
        newColDefs.unshift(
            new ColumnDef({
                id: uuidv4(),
                columnOrder: 0,
                tableName: tab,
                headerName: '',
                field: 'select',
                checkboxSelection: true,
                headerCheckboxSelection: true,
                width: 50,
                pinned: 'left'
            })
        ) &&
            newColDefs.push(
                new ColumnDef({
                    id: uuidv4(),
                    columnOrder: (newColDefs.length - 1 + count) * 5,
                    tableName: tab,
                    headerName: 'Date Created',
                    field: 'dateCreated',
                    sortable: true,
                    resizable: true
                })
            ) &&
            newColDefs.push(
                new ColumnDef({
                    id: uuidv4(),
                    columnOrder: (newColDefs.length - 1 + count) * 5,
                    tableName: tab,
                    headerName: 'Date Modified',
                    field: 'dateModified',
                    sortable: true,
                    resizable: true
                })
            )
    }

    newColDefs.forEach(
        (def) =>
            typeof def === 'object' &&
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

const genTemplateData = (tab, obj) => {
    const template = existsSync(tabPath(tab.concat('.template')))
        ? JSON.parse(readFileSync(tabPath(tab.concat('.template'))))
        : {}
    Object.keys(obj).forEach(
        (key) =>
            // Object.keys(template).some((key2) => key2 === key) ||
            // (template[key] = null)
            Object.hasOwn(template, key) ||
            Object.assign(template, { [key]: null })
    )
    writeFileSync(
        tabPath(tab.concat('.template')),
        // JSON.stringify(obj, (key, value) => (key.length ? null : value), 2)
        JSON.stringify(template, null, 2)
    )
}

const genSamples = (tab) => {
    const samples = JSON.parse(readFileSync(tabPath('samples')))
    samples.some((item) => item.sample.toLowerCase() === tab.toLowerCase()) ||
        samples.push({ sample: tab.charAt(0).toUpperCase() + tab.slice(1) })
    writeFileSync(tabPath('samples'), JSON.stringify(samples, null, 2))
}

export default router
