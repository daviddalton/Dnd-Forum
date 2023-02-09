import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import SectionTitleDesc from "../../../util/SectionTitleDesc"




function PantheonsPage(props: any) {
    var tempSection = new TopicSection()

    function handlePantheon(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#')
        console.log(tempSection)
    }

    console.log(props.splitDesc[4])
    handlePantheon(props.splitDesc)
    return (
        <div
            style={{
                border: '1px white solid',
                marginTop: '20px',
                display: 'flex',
                flexDirection: "column",
                alignItems: "center"
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} />
        </div>
    )
}

export default PantheonsPage