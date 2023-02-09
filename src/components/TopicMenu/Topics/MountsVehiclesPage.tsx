import React from "react"
import { useState } from "react"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import astrickSubSection from "../../../util/astrickSubSection"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildSubsections from "../../../util/buildSubSection"
import buildTable from "../../../util/buildTable"
import GeneralSubsectionContainer from "../../../util/GeneralSubsectionContainer"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"


function MountsVehiclesPage(props: any) {
    var tempSection = new TopicSection()

    const [width, setWidth] = useState(window.innerWidth)
    console.log(width)
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setWidth(window.innerWidth)
    }

    function handleMountsAndVehicles(splitDesc: string[]) {
        buildSectionDesc(tempSection ,splitDesc, '*', '')
        astrickSubSection(tempSection, splitDesc, '._**')
        buildTable(splitDesc, tempSection, 2)
    }

    handleMountsAndVehicles(props.splitDesc)

    return(
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                fontFamily: 'buenard'
            }}>
            <SectionTitleDesc name={props.name} tempSection={tempSection} />
            <div
                style={{
                    marginTop: '5px',
                }}>
                <GeneralSubsectionContainer tempSection={tempSection} />
            </div>
            <div
                style={{
                    display: width > 1030 ? ('flex'): ('block'),
                    flexWrap: 'wrap'
                }}>
            <TopicSectionTable tempSection={tempSection}/>
            </div>
        </div>
    )
}

export default MountsVehiclesPage