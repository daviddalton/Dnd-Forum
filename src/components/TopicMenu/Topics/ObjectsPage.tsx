import React, { useState } from "react"
import { Heading } from "../../../model/Character/Heading.class"
import { Table } from "../../../model/Character/Table.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import astrickSubSection from "../../../util/astrickSubSection"
import buildSectionDesc from "../../../util/buildSectionDesc"
import GeneralSubsectionContainer from "../../../util/GeneralSubsectionContainer"
import recursiveCleaning from "../../../util/recursiveCleaning"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"


function ObjectsPage(props: any) {
    var tempSection = new TopicSection()
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    function handleResize() {
        setWidth(window.innerWidth)
    }

    function handleObjects(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#')
        astrickSubSection(tempSection, splitDesc, '_**.')
        buildObjectHitPointsTable(7, splitDesc)
        buildObjectArmorClassTable(splitDesc, tempSection, 5)
    }
    function buildObjectHitPointsTable(index: number, splitDesc: string[]) {
        var tempTable = new Table()
        var tableElements = splitDesc[index + 1].split('\n')
        tempTable.title = recursiveCleaning(splitDesc[index], ['*', '(', ')'], '')
        buildTableHeadings(tempTable, tableElements)
        buildTableData(tempTable, tableElements)
        tempSection.tables.push(tempTable)
    }
    function buildTableHeadings(tempTable: Table, tableElements: string[]) {
        var headingElements = tableElements[0].split('|')
        headingElements.forEach((s: string) => {
            if (s !== '') {
                var tempHeading = new Heading()
                tempHeading.title = s.trim()
                tempTable.headings.push(tempHeading)
            }
        })
    }
    function buildTableData(tempTable: Table, tableElements: string[]) {
        for (let i = 2; i < tableElements.length; i++) {
            let tempData = tableElements[i]
            var tempArr = tempData.split('|')
            for (let j = 0; j < tempArr.length; j++) {
                let element = tempArr[j]
                if (element !== '') {
                    tempTable.headings[j - 1].data.push(element.trim())
                }
            }
        }
    }
     function buildObjectArmorClassTable(splitDesc: string[], tempSection: TopicSection, index: number) {
        var tempTable = new Table()
        var targetVariable = splitDesc[index]
        var splitTargetVar = targetVariable.split('\n')
        var splitHeadings = splitTargetVar[1].split('|')
        tempTable.title = recursiveCleaning(splitTargetVar[0], ['*','(',')'],'')
        splitHeadings.forEach((s: string) => {
            if (s !== '') {
                var tempHeading = new Heading()
                tempHeading.title = s.trim()
                tempTable.headings.push(tempHeading)
            }
        })
        for (let i = 3; i < splitTargetVar.length; i++) {
            let splitElement = splitTargetVar[i].split('|')
            for (let j = 0; j < splitElement.length; j++) {
                let currentElement = splitElement[j]
                if (currentElement !== "") {
                    tempTable.headings[j - 1].data.push(currentElement.trim())
                } 
            }
        }
        tempSection.tables.push(tempTable)
     }

    handleObjects(props.splitDesc)
    return (
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} width={width}/>
                <GeneralSubsectionContainer tempSection={tempSection} width={width} />
                <TopicSectionTable tempSection={tempSection} width={width} />
        </div>
    )
}

export default ObjectsPage