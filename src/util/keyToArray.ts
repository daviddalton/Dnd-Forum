


function keyToArray(keys: any) {
    var properties = []
    for(var key in keys) {
        if(keys.hasOwnProperty(key)) {
            properties.push(key)
        }
    }
    return properties
}

export default keyToArray