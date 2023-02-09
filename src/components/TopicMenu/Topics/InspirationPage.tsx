import { SubSection } from "../../../model/Character/SubSection.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildSubsections from "../../../util/buildSubSection"
import SectionTitleDesc from "../../../util/SectionTitleDesc"



function InspirationSubsecDesc(props: any) {
    return (
        <>
        {props.subSec?.desc?.map((des: string) => (
            <div className="backgrounds-subsection-desc-container">
                <div className="backgrounds-subsection-desc">
                    {des}
                </div>
            </div>
        ))}
        </>
    )
}

function InspirationPage(props: any) {
    var tempSection = new TopicSection()

    function handleInspiration(splitDesc: string[]) {
        if (splitDesc !== undefined) {
            buildSectionDesc(tempSection, splitDesc, '#', '*')
            buildSubsections(splitDesc, tempSection)
        }
    }


    handleInspiration(props.splitDesc)
    
    return<>
        
        <div className="backgrounds-content-container">
            <SectionTitleDesc name={props.name} tempSection={tempSection}/>
                <div className="backgrounds-subsections-container">
                        {tempSection?.subSections.map((subSec: SubSection) => {
                            return (
                                subSec.title !== 'Customizing a Background' ? (
                                    <div className="backgrounds-indv-subsection">
                                        <div className="backgrounds-subsection-titles">
                                            <h2>{subSec.title}</h2>
                                        </div>
                                        <InspirationSubsecDesc subSec={subSec}/>
                                    </div>
                                ): (
                                    <div></div>
                                )
                            )
                        })}
                </div>
        </div>
    </>
}

export default InspirationPage