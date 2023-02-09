import React, { useState } from "react"
import { Heading } from "../../../model/Character/Heading.class"
import { Table } from "../../../model/Character/Table.class"
import { TopicAttribute } from "../../../model/Character/TopicAttributes"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSubsections from "../../../util/buildSubSection"
import recursiveCleaning from "../../../util/recursiveCleaning"
import '../../styles/armorPage.css'
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"

function ArmorPage(props: any) {
    var tempSection = new TopicSection()
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setWidth(window.innerWidth)
    }
    function handleArmor(splitDesc: string[]) {
        buildArmorDesc(splitDesc)
        buildArmorAttributes(splitDesc)
        buildSubsections(splitDesc, tempSection)
        buildArmorTable(26, splitDesc)
        buildArmorTable(32, splitDesc)
    }
    function buildArmorDesc(splitDesc: string[]) {
        tempSection.desc.push(splitDesc[0])
        tempSection.desc.push(splitDesc[1])
        
    }
    function buildArmorAttributes(splitDesc: string[]) {
        let i = 2
        while (i < 7) {
            var tempAttribute = new TopicAttribute()
            var tempElements = splitDesc[i].replaceAll('*', '').split('_')
            tempAttribute.title = tempElements[1].replaceAll('.', '')
            tempAttribute.desc.push(tempElements[2].trim())
            tempSection.topicAttributes.push(tempAttribute)
            i++
        }
    }
    function buildArmorTable(index: number, splitDesc: string[]) {
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
            let tempElement = tableElements[i]
            var splitTableElement = tempElement.split('|')
            tempTable.headings[0].data.push(splitTableElement[1].replaceAll('**_Light Armor_**', '').replaceAll('**_Medium Armor_**', '').replaceAll('**_Heavy Armor_**', '').replaceAll('**_Shield_**', '').trim())
            tempTable.headings[1].data.push(splitTableElement[2])
            tempTable.headings[2].data.push(splitTableElement[3])
            if(tempTable.headings.length > 3) {
                tempTable.headings[3].data.push(splitTableElement[4])
                tempTable.headings[4].data.push(splitTableElement[5])
                tempTable.headings[5].data.push(splitTableElement[6])
            }
        }  
    }
    handleArmor(props.splitDesc)

    return(
        <div className='armor-content-container'>
                <SectionTitleDesc name={props.name} tempSection={tempSection} width={width}/>
                <div className='armor-subSections-container'>
                    <SubSectionsWithSubSections tempSection={tempSection} width={width}/>
                    {width > 700 ? (
                        <TopicSectionTable tempSection={tempSection} />
                    ): (
                        <div></div>
                    )}
                </div>
        </div>
    )
}

export default ArmorPage
