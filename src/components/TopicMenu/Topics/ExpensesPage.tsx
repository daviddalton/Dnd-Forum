import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildSubsections from "../../../util/buildSubSection"
import buildTable from "../../../util/buildTable"
import GeneralTable from "../../../util/TopicSectionTable"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import SubSectionsWithSubSections from "../../../util/SubsectionOfSubsection"
import { useWidth } from "../../creation/Providers/WidthContext"



function ExpensesPage(props: any) {
    var tempSection = new TopicSection()
    const width = useWidth()

    function handleExpenses(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '#')
        buildSubsections(splitDesc, tempSection)
        buildTable(splitDesc, tempSection, 2)
    }


    

    handleExpenses(props.splitDesc)
    return (
        <div
            style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: 'buenard'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: width.width! > 600 ? ('row') : ('column'),
                        width: 'fit-content'
                        
                    }}>
                    
                    <div
                        style={{
                            margin: '5px',
                            minWidth: '320px',
                            maxWidth: '780px',
                            width: '100%'
                        }}>
                            <SubSectionsWithSubSections tempSection={tempSection} width={width} />
                    </div> 
                    <div
                        style={{
                            display: "flex",
                            alignItems: 'center',
                            flexDirection: "column",
                            minWidth: '270px'
                        }}>
                            <GeneralTable tempSection={tempSection} />
                    </div>
                </div>
            

     
        </div>    
    )
}

export default ExpensesPage