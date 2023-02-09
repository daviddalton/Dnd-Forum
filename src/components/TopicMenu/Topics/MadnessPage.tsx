import React, { useState } from "react";
import { Heading } from "../../../model/Character/Heading.class";
import { SubSection } from "../../../model/Character/SubSection.class";
import { Table } from "../../../model/Character/Table.class";
import { TopicSection } from "../../../model/Character/TopicSection.class";
import buildSectionDesc from "../../../util/buildSectionDesc";
import SectionTitleDesc from "../../../util/SectionTitleDesc";
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection";



function MadnessPage(props: any) {
    var tempSection = new TopicSection()

    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    function handleResize() {
        setWidth(window.innerWidth)
    }
    function handleMadness(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#', '')
        buildMadnessSubsections(splitDesc, tempSection)
        buildMadnessTables(splitDesc)
    }

    function buildMadnessSubsections(splitDesc: string[], tempSection: TopicSection) {
        var tempArr = splitDesc.filter((s: string) => s.includes('#') && !s.includes('(table)'))
        tempArr.forEach((s: string) => {
            let tempSubsection = new SubSection()
            tempSubsection.title = s.replaceAll('#','').trim()
            for (let i = splitDesc.indexOf(s) + 1; i < splitDesc.length; i++) {
                let currentElement = splitDesc[i]
                if (currentElement.includes('#') && !currentElement.includes('(table)')) {
                    break
                } else if (currentElement.includes('*') && !currentElement.includes('(table)**') && !currentElement.includes('*.*')) {
                    
                    let childSubsection = new SubSection()
                    var tempMadness = currentElement.split('**')
                    childSubsection.title = tempMadness[1]
                    childSubsection.desc.push(tempMadness[0]+tempMadness[1]+tempMadness[2])
                    tempSubsection.subSections.push(childSubsection)
                } else if (!currentElement.includes('(table)')) {
                    tempSubsection.desc.push(currentElement.replaceAll('_','').replaceAll('*',''))
                }
            }
            tempSection.subSections.push(tempSubsection)
        })
        console.log(tempSection)
    }
    function buildMadnessTables(splitDesc: string[]) {
        var tableData = splitDesc.filter((s: string) => s.includes('(table)'))
        var splitTableData = tableData[0].split('\n')
        var tableNames = splitTableData.filter((s: string) => s.includes('(table)'))
        console.log(splitTableData)
        iterateOverIndvTableData(tableNames, splitTableData)

    }
    function iterateOverIndvTableData(tableNames: string[], splitTableData: string[]) {
        for (let i = 0; i < tableNames.length; i++){
            let s = tableNames[i]
            var tempTable = new Table()
            var headingOne = new Heading()
            var headingTwo = new Heading()
            // console.log('working with: ' + s)
            tempTable.title = s.replaceAll('*','').replaceAll('(table)','').trim()
            for (let i = splitTableData.indexOf(s) + 1; i < splitTableData.length; i++) {
                let currentElement = splitTableData[i]
                // console.log('working with: ' + currentElement)
                if (currentElement.includes('*') && i > 0) {
                    break
                } else if (i === 1 || i === 14 || i === 29) {
                    var splitHeadings = currentElement.split('|')
                    headingOne.title = splitHeadings[1].trim()
                    headingTwo.title = splitHeadings[2].trim()
                } else {
                    var splitCurrentElement = currentElement.split('|')
                    if (splitCurrentElement[1] !== undefined && splitCurrentElement[2] !== undefined && splitCurrentElement[1][0] !== '-') {
                        headingOne.data.push(splitCurrentElement[1].trim())
                        headingTwo.data.push(splitCurrentElement[2].trim())
                    }
                }
            }
            tempTable.headings.push(headingOne)
            tempTable.headings.push(headingTwo)
            tempSection.subSections[1].subSections[i].table = tempTable
        }
        console.log(tempSection)
    }

    handleMadness(props.splitDesc)
    return (
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: 'buenard'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} width={width}/>
                <SubSectionsWithSubSections tempSection={tempSection} width={width} />


        </div>
    )
}

export default MadnessPage