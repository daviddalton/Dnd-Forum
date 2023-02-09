import React, { useState } from "react"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildSubsections from "../../../util/buildSubSection"
import buildSubsectionOfSubsection from "../../../util/buildSubsectionOfSubsection"
import buildTable from "../../../util/buildTable"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection"
import TopicSectionTable from "../../../util/TopicSectionTable"



function WeaponsPage(props: any) {
    var tempSection = new TopicSection()
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setWidth(window.innerWidth)
    }

    function handleWeapons(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#', '')
        buildSubsections(splitDesc, tempSection)
        buildTable(splitDesc, tempSection, 2)
        console.log(tempSection)
    }

    handleWeapons(props.splitDesc)

    return (
        <div
            style={{
                margin: '20px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: 'buenard'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} />
                <SubSectionsWithSubSections tempSection={tempSection} width={width}/>
                { width > 899 ? (
                    <div
                        style={{
                        maxWidth: '900px',
                        minWidth: '900px',
                        width: '100%'
                    }}>
                        <TopicSectionTable tempSection={tempSection} />
                    </div>
                ):(
                    <div></div>
                )}

                
        </div>
    )
}

export default WeaponsPage