export function trimArrOfStrings(stringArr: string[]) {
    var tempStringArr: string[] = []
    stringArr.forEach((substring: string) => {
        if(substring !== "") {
            let trimmedSubstring = substring.trim()
            tempStringArr.push(trimmedSubstring)
        }
    })
    return tempStringArr
}