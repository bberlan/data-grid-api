import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import cars from './data/cars.js'

const filePath = path.resolve('.') + '/data/persons.json'
// const destPath = path.resolve('.') + '/data/cars.json'

const data = JSON.parse(readFileSync(filePath))

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

function jsonStringify(data) {
    return Array.isArray(data)
        ? '[' + data.map((e) => JSON.stringify(e)).join(',\n ') + ']'
        : JSON.stringify(data)
}

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
writeFileSync(filePath, jsonStringify(renameKeys(data)))
