import React, { useState } from "react"
import { Heading } from "../../../model/Character/Heading.class"
import { SubSection } from "../../../model/Character/SubSection.class"
import { Table } from "../../../model/Character/Table.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import recursiveCleaning from "../../../util/recursiveCleaning"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection"



function PoisonsPage(props: any) {
    var tempSection = new TopicSection()
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    function handleResize() {
        setWidth(window.innerWidth)
    }
    function handlePoisons(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '*')
        buildTypesOfPoisons(tempSection, splitDesc)
        buildPoisonTable(splitDesc, tempSection, 6)
    }
    function buildTypesOfPoisons(tempSection: TopicSection, splitDesc: string[]) {
        var typeArr = buildTypeArr(splitDesc)
        for (let i = 2; i < 6; i++) {
            let parentSubsection = new SubSection()
            let tempTitleAndDesc = splitDesc[i].split('_**.')
            let poisonType = tempTitleAndDesc[0].replaceAll('**_', '').trim()
            parentSubsection.title = poisonType
            parentSubsection.desc.push(tempTitleAndDesc[1].trim())
            let specificTypes = typeArr.filter((s: string) => s.includes(poisonType))
            buildSubsectionOfSubsectionPosionType(specificTypes, parentSubsection)
            tempSection.subSections.push(parentSubsection)
        }
       
    }
    function buildTypeArr(splitDesc: string[]) {
        var typeArr = []
        for (let i = 9; i < splitDesc.length; i++) {
            typeArr.push(splitDesc[i])
        }
        return typeArr
    }
    function buildSubsectionOfSubsectionPosionType(specificTypes: string[], parentSubSection: SubSection) {
        specificTypes.forEach((s: string) => {
            let childSubsection = new SubSection()
            let splitData = s.split('_**.')
            childSubsection.title = splitData[0].replaceAll('**_','').replaceAll('(', '- ').replaceAll(')','').trim()
            childSubsection.desc.push(splitData[1].replaceAll('_','').trim())
            parentSubSection.subSections.push(childSubsection)
        })
    }
    function buildPoisonTable(splitDesc: string[], tempSection: TopicSection, index: number) {
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
    handlePoisons(props.splitDesc)

    return (
       <div
        style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'buenard'
        }}>
            <SectionTitleDesc name={props.name} tempSection={tempSection} width={width} />
            <SubSectionsWithSubSections tempSection={tempSection} width={width} />
       </div>
    )
}

export default PoisonsPage