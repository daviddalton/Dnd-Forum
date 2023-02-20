
import { Heading } from "../model/Character/Heading.class"
import { Table } from "../model/Character/Table.class"
import { TopicSection } from "../model/Character/TopicSection.class"
import recursiveCleaning from "./recursiveCleaning"

function buildTable(splitDesc: string[], tempSection: TopicSection, index: number) {
    var tempArr = splitDesc.filter((s: string) => s.includes('|'))
    tempArr.forEach((s: string) => {
        var tempTable = new Table()
        var tempData = s.split('\n')
        var tempHeadingData = tempData[0].split('|')
        if (splitDesc[splitDesc.indexOf(s) - 1] !== undefined) {
            tempTable.title = recursiveCleaning(splitDesc[splitDesc.indexOf(s) - 1], ['*', '(', ')'], '')
        } 
        createHeadings(tempHeadingData, tempTable)
        createData(tempData, tempTable, index)
        tempSection.tables.push(tempTable)
        
    })
}
export function createHeadings(tempData: string[], tempTable: Table) {
    tempData.forEach((s: string) => {
        var tempHeading = new Heading()
        if (s !== '' && s !== ' ') {
            tempHeading.title = s.trim()
            tempTable.headings.push(tempHeading)
        }
    })
}
export function createData(tempData: string[], tempTable: Table, index: number) {
    for (let i = index; i < tempData.length; i++) {
        var tempArr = tempData[i].split('|')
        for (let j = 1; j < tempArr.length - 1; j++) {
            let tableData = tempArr[j]
            var includedChars = ['-',',','e','a','o','i','u','y','*','p','l','t','x','2','1','3','4','5','6','7','8','9']
            if (includedChars.every((char: string) => !tableData.includes(char))) {
                tempTable.headings[j-1].data.push('-')
            } else {
                tempTable.headings[j-1].data.push(recursiveCleaning(tempArr[j],['*','_'], '').trim())
            }
        }
    }
}

export default buildTable