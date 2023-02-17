import React, { useState } from "react"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildTable from "../../../util/buildTable"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"





function LevelingUpPage(props: any) {

    var tempSection = new TopicSection()

    const [width, setWidth] = useState(window.innerWidth)
    const tableChangeWidth = 360
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setWidth(window.innerWidth)
    }
    console.log(props.splitDesc)

    
    function handleLevelUp(splitDesc: string[]) {
       buildLevelUpDesc(splitDesc)
       buildTable(splitDesc, tempSection, 3)
    }
    function buildLevelUpDesc(splitDesc: string[]) {
        for(let i = 0; i < splitDesc.length; i++) {
            if (i < 5) {
                tempSection.desc.push(splitDesc[i].replaceAll('*',''))
            }
        }
    }
    
    handleLevelUp(props.splitDesc)
    console.log(tempSection)
    return (
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <SectionTitleDesc tempSection={tempSection} name={props.name} width={width}/>
                <TopicSectionTable tempSection={tempSection} width={width} tableChangeWidth={tableChangeWidth}/>
        </div>
    )
}

export default LevelingUpPage