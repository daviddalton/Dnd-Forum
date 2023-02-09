import { Heading } from "../../../model/Character/Heading.class"
import { Table } from "../../../model/Character/Table.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import recursiveCleaning from "../../../util/recursiveCleaning"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import '../../styles/equipmentPage.css'

function EquipmentPage(props: any) {
    var tempSection = new TopicSection()

    function handleEquipment(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '*', '')
        buildTable(splitDesc, tempSection)
    }
    function buildTable(splitDesc: string[], tempSection: TopicSection) {
        var tempArr = splitDesc.filter((s: string) => s.includes('|'))
        tempArr.forEach((s: string) => {
            var tempTable = new Table()
            var tempData = s.split('\n')
            var tempHeadingData = tempData[0].split('|')
            tempTable.title = recursiveCleaning(splitDesc[splitDesc.indexOf(s) - 1], ['*', '(', ')'], '') 
            createHeadings(tempHeadingData, tempTable)
            createData(tempData, tempTable)
            tempSection.tables.push(tempTable)
        })
    }
    function createHeadings(tempData: string[], tempTable: Table) {
        tempData.forEach((s: string) => {
            var tempHeading = new Heading()
            if (s !== '') {
                tempHeading.title = s.trim()
                tempTable.headings.push(tempHeading)
            }
        })
    }
    function createData(tempData: string[], tempTable: Table) {
        for (let i = 2; i < tempData.length; i++) {
            var tempArr = tempData[i].split('|')
            for (let j = 1; j < tempArr.length - 1; j++) {
                tempTable.headings[j-1].data.push(tempArr[j].trim())
            }
        }
    }
    handleEquipment(props.splitDesc)

    return(
        <div className="equipment-content-container">
            <SectionTitleDesc name={props.name} tempSection={tempSection} />
                <div className="equipment-table-panel">
                        <div className="equipment-table">
                                {tempSection.tables[0].headings.map((heading: Heading) => (
                                    <div className="equipment-heading-data-container">
                                        <div className="equipment-heading">
                                                {heading.title}
                                        </div>
                                        {heading.data.map((dat: string) => (
                                            <div className="equipment-data" >
                                                    {dat}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                </div>
        </div>
    )
}

export default EquipmentPage