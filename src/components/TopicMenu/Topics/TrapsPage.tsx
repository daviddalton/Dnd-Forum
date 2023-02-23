import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import hashSubsections from "../../../util/hashSubsections"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection"
import { useWidth } from "../../WidthContext"



function TrapsPage(props: any) {
    var tempSection = new TopicSection()
    const width = useWidth()

    function handleTraps(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#')
        hashSubsections(splitDesc, tempSection)
    }

    handleTraps(props.splitDesc)
    
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} width={width.width!}/>
                <SubSectionsWithSubSections tempSection={tempSection} width={width.width!} />
        </div>
    )
}

export default TrapsPage