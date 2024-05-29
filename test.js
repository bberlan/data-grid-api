import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import ColumnDef from './models/columndef.js'
// import Address from './models/address.js'

const filePath = path.resolve('.') + '/data/cars.json'
// const destPath = path.resolve('.') + '/data/cars.json'

const data = JSON.parse(readFileSync(filePath))

function createNewColDefs() {
    // const newColDef = new ColumnDef()
    // const newAddress = new Address()
    console.log(newAddress)
}

function renameKeys(data) {
    return data.map((obj) =>
        Object.entries(obj).reduce((obj2, [key, value]) => {
            obj2[camelCase(key)] = value
            return obj2
        }, {})
    )
}

function deleteObjProp(data) {
    return data.map((obj) => {
        for (const prop in obj) {
            if (obj[prop].length === 0)
                delete obj[prop] /*console.log(`[${i}].${prop}`)*/
        }
        return obj
    })
}

function cleanObjProps(data) {
    return data.map((obj) => {
        for (const prop in obj) {
            if (
                obj[prop] === undefined ||
                obj[prop] === null ||
                obj[prop].length === 0
            )
                delete obj[prop]
        }
        return obj
    })
}

function camelCase(key) {
    return key.substring(0, 1).toLowerCase() + key.substring(1)
}

function haederName(key) {
    return (key.charAt(0).toUpperCase() + key.slice(1))
        .split(/(?=[A-Z])/)
        .join(' ')
}

function jsonStringify(data) {
    return Array.isArray(data)
        ? '[' + data.map((e) => JSON.stringify(e)).join(',\n ') + ']'
        : JSON.stringify(data)
}

function booleanReplacer(key, value) {
    if (
        [
            'sortable',
            'filter',
            'resizable',
            'checkboxSelection',
            'headerCheckboxSelection',
            'electric'
        ].includes(key) &&
        value !== null &&
        typeof value !== 'boolean'
    ) {
        return value ? true : false
    }
    return value
}

console.log(haederName('countryACode'))

// createNewColDefs()

// console.log(JSON.stringify(data, booleanReplacer, 2))

// writeFileSync(filePath, JSON.stringify(data, booleanReplacer, 2))

// function keyReplacer(key, value) {
//     return [camelCase(key)]
// }

// writeFileSync(destPath, data)
// console.log(cars)
// console.log(deleteObjProp(data))
// writeFileSync(jsonFilePath, jsonStringify(deleteObjProp(data)))

// renameKeys2(data)
// console.log(renameKeys(data))
// console.log(jsonStringify(renameKeys(data)))
// console.log(jsonStringify(rename(data)))
// writeFileSync(filePath, jsonStringify(renameKeys(data)))
