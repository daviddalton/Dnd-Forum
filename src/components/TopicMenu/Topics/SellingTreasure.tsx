import { TopicSection } from "../../../model/Character/TopicSection.class"
import astrickSubSection from "../../../util/astrickSubSection"
import buildSectionDesc from "../../../util/buildSectionDesc"
import GeneralSubsectionContainer from "../../../util/GeneralSubsectionContainer"
import SectionTitleDesc from "../../../util/SectionTitleDesc"


function SellingTreasurePage(props: any) {
    var tempSection = new TopicSection()

    function handleSellingTreasure(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '*', '')
        astrickSubSection(tempSection, splitDesc, '._**')
    }

    handleSellingTreasure(props.splitDesc)
    return (
        <div
            style={{
                display: "flex",
                flexDirection: 'column',
                marginTop: '20px',
                alignItems: "center"
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} />
                <GeneralSubsectionContainer tempSection={tempSection} />
        </div>
    )
}

export default SellingTreasurePage