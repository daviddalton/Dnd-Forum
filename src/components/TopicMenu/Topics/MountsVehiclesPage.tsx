import { TopicSection } from "../../../model/Character/TopicSection.class"
import astrickSubSection from "../../../util/astrickSubSection"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildTable from "../../../util/buildTable"
import GeneralSubsectionContainer from "../../../util/GeneralSubsectionContainer"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"
import { useWidth } from "../../creation/Providers/WidthContext"

function MountsVehiclesPage(props: any) {
    var tempSection = new TopicSection()
    const width = useWidth()

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
                    display: width.width! > 1030 ? ('flex'): ('block'),
                    flexWrap: 'wrap'
                }}>
            <TopicSectionTable tempSection={tempSection}/>
            </div>
        </div>
    )
}

export default MountsVehiclesPage