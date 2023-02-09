function recursiveCleaning(subString: string, arrOfReplacementChars: string[], replacement: string): any {
    if(arrOfReplacementChars.length > 0) {
        var tempString = subString.replaceAll(arrOfReplacementChars[arrOfReplacementChars.length - 1], replacement)
        arrOfReplacementChars.pop()
        return recursiveCleaning(tempString, arrOfReplacementChars, replacement)
    } else {
       return subString.trim()
    }
}

export default recursiveCleaning