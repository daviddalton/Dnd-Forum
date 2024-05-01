import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildTable from "../../../util/buildTable"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"
import { useWidth } from "../../creation/Providers/WidthContext"

function LevelingUpPage(props: any) {
    var tempSection = new TopicSection()
    const width = useWidth()
    const tableChangeWidth = 360

    handleLevelUp(props.splitDesc)

    function handleLevelUp(splitDesc: string[]) {
       buildLevelUpDesc(splitDesc)
       buildTable(splitDesc, tempSection, 3)
    }
    function buildLevelUpDesc(splitDesc: string[]) {
        for(let i = 0; i < 5; i++) {
                tempSection.desc.push(splitDesc[i].replaceAll('*',''))
        }
    }
    

    
    return (
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <SectionTitleDesc tempSection={tempSection} name={props.name} width={width.width!}/>
                <TopicSectionTable tempSection={tempSection} width={width.width!} tableChangeWidth={tableChangeWidth}/>
        </div>
    )
}

export default LevelingUpPage