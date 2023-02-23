import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildSubsections from "../../../util/buildSubSection"
import buildTable from "../../../util/buildTable"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import SubSectionAccordion from "../../../util/SubSectionAccordion"
import TopicSectionTable from "../../../util/TopicSectionTable"
import { useWidth } from "../../WidthContext"



function ConditionsPage(props: any) {
    var tempSection = new TopicSection()
    const width = useWidth()

    function handleConditions(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#', '')
        buildSubsections(splitDesc, tempSection)
        buildTable(splitDesc, tempSection, 2)
        console.log(tempSection)
    }

    handleConditions(props.splitDesc)
    return (
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: width.width! > 780 ? ('row') : ('column'),
                        maxWidth: '780px',
                        minWidth: '340px'
                    }}>
                    <div
                        style={{
                            maxWidth: width.width! > 785 ? ('400px'):('780px'),
                            minWidth: '320px',
                            width: '100%',
                        }}>
                        <SubSectionAccordion tempSection={tempSection} />
                    </div>
                    <div>
                        <TopicSectionTable tempSection={tempSection} />
                    </div>
                </div>

        </div>
    )
}

export default ConditionsPage