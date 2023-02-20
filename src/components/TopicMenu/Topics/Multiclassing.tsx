import { Heading } from "../../../model/Character/Heading.class"
import { SubSection } from "../../../model/Character/SubSection.class"
import { Table } from "../../../model/Character/Table.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import GeneralSubsectionContainer from "../../../util/GeneralSubsectionContainer"
import recursiveCleaning from "../../../util/recursiveCleaning"
import SectionTitleDesc from "../../../util/SectionTitleDesc"



function MulticlassingPage(props: any) {

    const tempSection = new TopicSection()
    const spellCastingSubsection = new SubSection()
    console.log(props.splitDesc)

    function handleMulticlassingPage(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#')
       
        buildPrerequisites(splitDesc)
        buildTitleAndOneDesc(7, 9, splitDesc)
        buildTitleAndOneDesc(12, 14, splitDesc)
        buildTitleAndOneDesc(18, 20, splitDesc)
        buildTitleAndOneDesc(20, 22, splitDesc)
        buildTitleAndOneDesc(22, 24, splitDesc)
        buildTitleAndOneDesc(24, 26, splitDesc)
        buildHitPointsAndDice(splitDesc)
        buildProficiencies(splitDesc)
        buildSpellCastingSubsection(26, 35, splitDesc)
    }

    function buildPrerequisites(splitDesc: string[]) {
        var tempSubSection = new SubSection()
        for (let i = 3; i < 7; i++) {
            if (i === 3) {
                tempSubSection.title = splitDesc[i].replaceAll('#','').trim()
            } else if (i === 4) {
                tempSubSection.desc.push(splitDesc[i])
            } else if (i === 5 && i+1 === 6) {
                buildTable(splitDesc, tempSubSection, 2)
            }
             
        }
        tempSection.subSections.push(tempSubSection)
    }

    function buildHitPointsAndDice(splitDesc: string[]) {
        var tempSubsection = new SubSection()
        for (let i = 9; i < 12; i++) {
            if(i === 9) {
                tempSubsection.title = splitDesc[i].replaceAll('#', '').trim()
            } else if (i === 10 || i === 11) {
                tempSubsection.desc.push(splitDesc[i])
            }
        }
        tempSection.subSections.push(tempSubsection)
    }
    function buildProficiencies(splitDesc: string[]) {
        var tempSubsection = new SubSection()
        for (let i = 14; i < 18; i++) {
            if (i === 14) {
                tempSubsection.title = splitDesc[i].replaceAll('#','').trim()
            } else if (i === 15) {
                tempSubsection.desc.push(splitDesc[i])
            } else if (i === 16 && i+1 === 17) {
                buildTable(splitDesc, tempSubsection, 2)
            }
        }
        tempSection.subSections.push(tempSubsection)
    }
    function buildTitleAndOneDesc(start: number, end: number, splitDesc: string[]) {
        var tempSubsection = new SubSection()
        for (let i = start; i < end; i++) {
            if (i === start) {
                tempSubsection.title = splitDesc[i].replaceAll('#','').trim()
            } else if (i === end - 1) {
                tempSubsection.desc.push(splitDesc[i])
            }
        }
        tempSection.subSections.push(tempSubsection)
    }
    function buildAstrickSubsection(start: number, end: number, splitDesc: string[]){
        var tempSubsection = new SubSection()
        for (let i = start; i < end; i++) {
            if (i === start) {
                var tempArr = splitDesc[i].split('._**')
                tempSubsection.title = tempArr[0].replaceAll('**_','').trim()
                tempSubsection.desc.push(tempArr[1].trim())
            } else if (i === end -1) {
                tempSubsection.desc.push(splitDesc[i])
            }
        }
        tempSection.subSections.push(tempSubsection)
    }
    function buildSpellCastingSubsection(start: number, end: number, splitDesc: string[]) {
        for (let i = start; i < splitDesc.length; i++) {
            if (i === 26) {
                spellCastingSubsection.title = splitDesc[i].replaceAll('#','').trim()
            } else if (i === 27) {
                spellCastingSubsection.desc.push(splitDesc[i])
            } else if (splitDesc[i].includes('**_')) {
                var tempSubsection = new SubSection()
                var tempArr = splitDesc[i].split('._**')
                tempSubsection.title = tempArr[0].replaceAll('**_','').trim()
                tempSubsection.desc.push(tempArr[1].trim())
                for (let j = i; j < splitDesc.length; j++) {
                    if (splitDesc[j].includes('*') || splitDesc[j].includes('|')) {
                        break
                    } else {
                        tempSubsection.desc.push(splitDesc[j])
                    }
                }
                spellCastingSubsection.subSections.push()
            } else if (i === 34) {
                var otherTempSubsection = new SubSection()
                var otherTempArr = splitDesc[i].split(':')
                console.log(otherTempArr)
                otherTempSubsection.title = otherTempArr[0].replaceAll('**','').trim()
                otherTempSubsection.desc.push(recursiveCleaning(otherTempArr[1], ['*','(',')'],'').trim())
                for (let j = i; j < splitDesc.length; j++) {
                    if (splitDesc[j].includes('|')) {
                        var tempTable = new Table()
                        var tempData = splitDesc[j].split('\n')
                        var tempHeadingData = tempData[0].split('|')
                        createHeadings(tempHeadingData, tempTable)
                        createData(tempData, tempTable, 2)
                        otherTempSubsection.table = tempTable
                    }
                    spellCastingSubsection.subSections.push(otherTempSubsection)
                }
            }
        }
        console.log(spellCastingSubsection)
    }
    function buildTable(splitDesc: string[], tempSubSection: SubSection, index: number) {
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
            tempSubSection.table = tempTable
            
        })
    }
    function createHeadings(tempData: string[], tempTable: Table) {
        tempData.forEach((s: string) => {
            var tempHeading = new Heading()
            if (s !== '' && s !== ' ') {
                tempHeading.title = s.trim()
                tempTable.headings.push(tempHeading)
            }
        })
    }
    function createData(tempData: string[], tempTable: Table, index: number) {
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
    handleMulticlassingPage(props.splitDesc)
    console.log(tempSection)
    return (
        <div
            style={{
                marginTop: '20px',
                border: '1px white solid',
                display: 'flex',
                alignItems: "center",
                flexDirection: 'column'
            }}>
                <SectionTitleDesc tempSection={tempSection} name={props.name}/>
                <GeneralSubsectionContainer tempSection={tempSection} />
                <div
                    style={{
                        border: '1px white solid',
                        margin: '5px',
                        display: 'flex',
                        flexDirection: "column",
                        width: ''
                    }}>
                        <div
                            style={{
                                border: '1px white solid',
                                margin: '5px',
                                padding: '5px'
                            }}>
                                Spellcasting
                        </div>
                        <div
                            style={{
                                border: '1px white solid',
                                margin: '5px',
                                padding: '5px'
                            }}>
                                {spellCastingSubsection.desc}
                        </div>
                </div>
        </div>
    )
}

export default MulticlassingPage