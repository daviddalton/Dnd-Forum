import { SubSection } from "../model/Character/SubSection.class"
import { TopicSection } from "../model/Character/TopicSection.class"
import buildSubsectionOfSubsection from "./buildSubsectionOfSubsection"
import recursiveCleaning from "./recursiveCleaning"

function buildSubsections(splitDesc: string[], tempSection: TopicSection) {
    var tempTitles = splitDesc.filter((s: string) => s.includes('##'))
    tempTitles.forEach((s: string) => {
        var parentSubSection = new SubSection()
        if (!s.includes('>')) {
            parentSubSection.title = s.replaceAll('#', '').trim()
        } else {
            var splitData = s.split('\n>\n>')
            parentSubSection.title = recursiveCleaning(splitData[0], ['#', '>'], '').trim()
        }
        if(!s.includes('>')) {
            for (let i = splitDesc.indexOf(s) + 1; i < splitDesc.length; i ++) {
                let subSectionElements = splitDesc[i]
                if (subSectionElements.includes('**_') && !subSectionElements.includes('|')) {
                    buildSubsectionOfSubsection(parentSubSection, subSectionElements)
                } else if (subSectionElements.includes('##') && !subSectionElements.includes('>')) {
                    break
                } else if (!subSectionElements.includes('**') && !subSectionElements.includes('|') && !subSectionElements.includes('>')){
                    parentSubSection.desc.push(subSectionElements.replaceAll('*', ''))
                } 
            }
        } else if (s.includes('>')) {
            var descData = s.split('\n>\n>')
            for (let i = 1; i < descData.length; i++) {
                parentSubSection.desc.push(descData[i].trim())
            }
        }

        tempSection.subSections.push(parentSubSection)
    })
}

export default buildSubsections