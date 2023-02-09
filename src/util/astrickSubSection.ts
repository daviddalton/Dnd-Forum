import { SubSection } from "../model/Character/SubSection.class"
import { TopicSection } from "../model/Character/TopicSection.class"
import recursiveCleaning from "./recursiveCleaning"

function astrickSubSection(tempSection: TopicSection, splitDesc: string[], subsectionIdentifier: string) {
    var tempArr = splitDesc.filter((s: string) => s.includes(subsectionIdentifier))
    tempArr.forEach((s: string) => {
        var tempSubSection = new SubSection()
        var tempElements = s.split(subsectionIdentifier)
        tempSubSection.title = recursiveCleaning(tempElements[0], ['*','_'],'').trim()
        tempSubSection.desc.push(tempElements[1].trim())
        tempSection.subSections.push(tempSubSection)
    })
}

export default astrickSubSection