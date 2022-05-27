export const excludeKeysFromObj = (obj, ...keys) => {
    keys.forEach(key => {
        if (Object.keys(obj).includes(key)){
            delete obj[key]
        }
    })
}