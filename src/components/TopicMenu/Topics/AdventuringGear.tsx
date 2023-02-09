import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { fontSize } from '@mui/system'
import { SubSection } from '../../../model/Character/SubSection.class'
import { TopicSection } from '../../../model/Character/TopicSection.class'
import recursiveCleaning from '../../../util/recursiveCleaning'
import SectionTitleDesc from '../../../util/SectionTitleDesc'
import SubSectionAccordion from '../../../util/SubSectionAccordion'
import '../../styles/adventuringGear.css'



function AdventuringGearPage(props: any) {
    var tempSection = new TopicSection()

    function TopicSectionDescCreate(splitDesc: string[], subString: string, charsStopAt: string[], charsToReplace?: string[]) {
        if (!charsStopAt.some(char => subString.includes(char)) && splitDesc.indexOf(subString) < 5) {
            tempSection.desc.push(subString)
        } 
    }
    function subSectionCreate(subString: string, subSectionTargetChar: string[]) {
        if (subSectionTargetChar.some(char => subString.includes(char))){
            var tempSubSection = new SubSection()
                var splitData = recursiveCleaning(subString, ['**'], ' ')
                var newSplitData = subStringSplitter(splitData, '_')
                tempSubSection.title = newSplitData[1].replaceAll('.', '')
                tempSubSection.desc.push(newSplitData[2].trim())
                tempSection.subSections.push(tempSubSection) 
        }
    }

    function subStringSplitter(subString: string, charSplitAt: string) {
        var tempString = subString.split(charSplitAt)
        return tempString
    }

    function topicSectionCreate(splitDesc: string[]) {
        for (let i = 0; i < splitDesc.length; i++) {
            let subString = splitDesc[i]
            if (!subString.includes("*") && !subString.includes("|") && !subString.includes('#')) {
                TopicSectionDescCreate(splitDesc, subString, ['*', '|'])
            } else if (subString.includes('*')) {
                subSectionCreate(subString, ['*', '#'])
            }  
        }
    }

    topicSectionCreate(props.splitDesc)

    return (
        <div className='adventuringGear-content-container'>
            <SectionTitleDesc name={props.name} tempSection={tempSection} />
            <div className='adventuringGear-subSection-container'>
                <SubSectionAccordion tempSection={tempSection} />
            </div>
        </div>
    )
}

export default AdventuringGearPage