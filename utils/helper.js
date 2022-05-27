export const removeKeysFromObj = (obj, ...keys) => {
    keys.forEach(key => {
        if (Object.keys(obj).includes(key)){
            delete obj[key]
        }
    })
}