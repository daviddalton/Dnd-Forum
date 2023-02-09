import { flexbox } from "@mui/system"
import { SubSection } from "../../../model/Character/SubSection.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildSubsections from "../../../util/buildSubSection"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import '../../styles/backgrounds.css'




function BackgroundSubsecDesc(props: any) {
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
function CustomizingABackground(props: any) {
    return (
        <>
            <div className="customizing-a-background">
                <div className="backgrounds-subsection-titles">
                    <h2>{props.subSec.title}</h2>
                </div>
                {props.subSec?.desc?.map((des: string) => (
                    <div className="backgrounds-subsection-desc-container">
                        <div className="backgrounds-subsection-desc">
                            {des}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
function BackgroundsPage(props: any) {
    var tempSection = new TopicSection()

    function handleBackgrounds(splitDesc: string[]) {
        if (splitDesc !== undefined) {
            buildSectionDesc(tempSection ,splitDesc, '#', '*')
            buildSubsections(splitDesc, tempSection)
        }
    }

    handleBackgrounds(props.splitDesc)
    
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
                                        <BackgroundSubsecDesc subSec={subSec}/>
                                    </div>
                                ): (
                                    <CustomizingABackground subSec={subSec}/>
                                )
                            )
                        })}
                </div>
        </div>
    </>
}

export default BackgroundsPage