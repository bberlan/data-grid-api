function jsonStringify(data) {
    return Array.isArray(data)
        ? '[' + data.map((e) => JSON.stringify(e)).join(',\n ') + ']'
        : JSON.stringify(data)
}

// function renameKeys(data) {
//     return data.map((obj) =>
//         Object.entries(obj).map(([key, value]) => ({ [camelCase(key)]: value }))
//     )
// }

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

function headerName(key) {
    return (key.charAt(0).toUpperCase() + key.slice(1))
        .split(/(?=[A-Z])/)
        .join(' ')
}

function cleanProps(obj) {
    for (const prop in obj) {
        if (
            obj[prop] === undefined ||
            obj[prop] === null ||
            obj[prop].length === 0
        )
            delete obj[prop]
    }
    return obj
}

export { jsonStringify, renameKeys, cleanProps, headerName }
