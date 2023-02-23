import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import hashSubsection from "../../../util/hashSubsections"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection"
import { useWidth } from "../../WidthContext"



function DiseasesPage(props: any) {
    var tempSection = new TopicSection()
    const width = useWidth()
    function handleDiseases(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#', '')
        hashSubsection(splitDesc, tempSection)
    }

    handleDiseases(props.splitDesc)
    return (
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: 'buenard'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} width={width.width!}/>
                <SubSectionsWithSubSections tempSection={tempSection} width={width.width!} />
        </div>
    )
}

export default DiseasesPage