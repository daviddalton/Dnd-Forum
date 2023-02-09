import { Heading } from "../../../model/Character/Heading.class"
import { SubSection } from "../../../model/Character/SubSection.class"
import { Table } from "../../../model/Character/Table.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import recursiveCleaning from "../../../util/recursiveCleaning"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import "../../styles/languages.css"





function LanguagesPage(props: any) {
    var tempSection = new TopicSection()

    function topicSectionCreate(splitDesc: string[]) {
        var tempSubSection: SubSection | undefined
        var tempTable: Table | undefined
        for (let i = 0; i < splitDesc.length; i++) {
            let subString = splitDesc[i]
            if (!subString.includes("*") && !subString.includes("|") && !subString.includes('#')) {
                TopicSectionDescCreate(splitDesc, subString, ['*', '|'])
            } else if (subString.includes('*')) {
                tempSubSection = subSectionCreate(subString, ['*', '#'])
            } else if (subString.includes('|')) {
                tempTable = tableCreate(subString)
                tempTable = tableHeadingsCreate(subString, tempTable!)
                tempTable = tableDataCreate(subString, tempTable!)
                tempSubSection!.table = tempTable!
                tempSection.subSections.push(tempSubSection!)
            }   
        }
    }
    function TopicSectionDescCreate(splitDesc: string[], subString: string, charsStopAt: string[], charsToReplace?: string[]) {
        if (!charsStopAt.some(char => subString.includes(char)) && splitDesc.indexOf(subString) < 5) {
            tempSection.desc.push(subString)
        } 
    }
    function subSectionCreate(subString: string, subSectionTargetChar: string[]) {
        if (subSectionTargetChar.some(char => subString.includes(char))){
            var tempSubSection = new SubSection()
            tempSubSection.title = recursiveCleaning(subString, ['*', '(table)', '#'], '')
            return tempSubSection
        }
    }
    function tableCreate(subString: string) {
        if (subString.includes('|')){
            var tempTable = new Table()
            return tempTable
        }
    }
    function subStringSplitter(subString: string, charSplitAt: string) {
        var tempString = subString.split(charSplitAt)
        return tempString
    }
    function removeWhiteSpace(stringArr: string[]) {
        let tempArr: string[] = []
        stringArr.forEach((subString: string) => {
            if (subString !== '') {
                tempArr.push(subString.trim())
            }
        })
        return tempArr
    }
    function tableHeadingsCreate(subString: string, table: Table) {
        if (subString.includes('|')) {
            var tempTableData = subStringSplitter(subString, '\n')
            var headings = subStringSplitter(tempTableData[0], '|')
            headings = removeWhiteSpace(headings)
            headings.forEach((subString: string) => {
                let tempHeading = new Heading()
                tempHeading.title = subString
                table.headings.push(tempHeading)
            })
            return table
        }
    }
    function tableDataCreate(subString: string, table: Table) {
        if (subString.includes('|')) {
            var tempTableData = subStringSplitter(subString, '\n')
            for (let i = 2; i < tempTableData.length; i++ ) {

                var tempData = subStringSplitter(tempTableData[i], '|')
                tempData = removeWhiteSpace(tempData)
                table.headings[0].data.push(tempData[0])
                table.headings[1].data.push(tempData[1])
                table.headings[2].data.push(tempData[2])
            }
            return table
        }
    }

    topicSectionCreate(props.splitDesc)

    return (
        <div className="language-content-container">
            <SectionTitleDesc name={props.name} tempSection={tempSection} />
            <div className="language-subSection-container">
                {tempSection?.subSections.map((subSec: SubSection) => {
                    return (
                        <div key={subSec.title} className="language-indv-subsection-container">
                            <div  className="language-subSection-indv-title">
                                <h2>{subSec.title}</h2>
                            </div>
                            <div className="language-subSection-indv-content">
                                <LanguagesTables subSec={subSec}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function LanguagesTables(props: any) {
    return (
    <>
        {props.subSec.table?.headings.map((heading: Heading) => (
            <div className="languages-table-container">
                <div className="language-table-titles">
                    <h3>{heading.title}</h3>
                </div>
                {heading.data.map((data: string) => (
                    <div className="language-table-data-contents">
                        {data} 
                    </div>
                ))}
            </div>
        ))}
    </>
    )
}
export default LanguagesPage