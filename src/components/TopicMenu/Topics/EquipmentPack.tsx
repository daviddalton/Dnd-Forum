import { SubSection } from "../../../model/Character/SubSection.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import GeneralSubsectionContainer from "../../../util/GeneralSubsectionContainer"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'


function EquipmentPacksPage(props: any) {
    var tempSection = new TopicSection()

    function handleEquipmentPack(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '*')
        buildSubSections(splitDesc)
    }

    function buildSubSections(splitDesc: string[]) {
        var tempArr = splitDesc.filter((s: string) => s.includes('gp)'))
        
        tempArr.forEach((s: string) => {
            var tempSubSection = new SubSection()
            var tempData = s.replaceAll('(', '- ').replaceAll('*', '').split(').')
            tempSubSection.title = tempData[0]
            tempSubSection.desc.push(tempData[1])
            tempSection.subSections.push(tempSubSection)
        })
    }


    handleEquipmentPack(props.splitDesc)

    return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
        <div
            style={{
                margin: '20px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection}/>
                <GeneralSubsectionContainer tempSection={tempSection} />
        </div>
        </CSSTransition>
    )
}

export default EquipmentPacksPage