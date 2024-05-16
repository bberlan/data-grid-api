import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const jsonFilePath = path.resolve('.') + '/data/toolbardefs.json'

const data = JSON.parse(readFileSync(jsonFilePath))

function renameKeys(data) {
    return data.map((obj) =>
        Object.entries(obj).reduce((obj2, [key, value]) => {
            obj2[camelCase(key)] = value
            return obj2
        }, {})
    )
}

function camelCase(key) {
    return key.substring(0, 1).toLowerCase() + key.substring(1)
}

function jsonStringify(data) {
    return Array.isArray(data)
        ? '[' + data.map((e) => JSON.stringify(e)).join(',\n ') + ']'
        : JSON.stringify(data)
}

// renameKeys2(data)
// console.log(renameKeys(data))
// console.log(jsonStringify(renameKeys(data)))
// console.log(jsonStringify(rename(data)))
writeFileSync(jsonFilePath, jsonStringify(renameKeys(data)))
