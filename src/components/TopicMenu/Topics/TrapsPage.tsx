import React, { useState } from "react"
import { SubSection } from "../../../model/Character/SubSection.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import hashSubsections from "../../../util/hashSubsections"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection"



function TrapsPage(props: any) {
    var tempSection = new TopicSection()
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    function handleResize() {
        setWidth(window.innerWidth)
    }

    function handleTraps(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#')
        hashSubsections(splitDesc, tempSection)
    }

    // function buildTrapSubsections(splitDesc: string[], tempSection: TopicSection) {
    //     for (let i = 2; i < splitDesc.length; i++) {
    //         let currentElement = splitDesc[i]
    //         if (currentElement )
    //     }
    // }

    handleTraps(props.splitDesc)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} width={width}/>
                <SubSectionsWithSubSections tempSection={tempSection} width={width} />
        </div>
    )
}

export default TrapsPage