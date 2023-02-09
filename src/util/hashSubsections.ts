import { SubSection } from "../model/Character/SubSection.class"
import { TopicSection } from "../model/Character/TopicSection.class"



function hashSubsections(splitDesc: string[], tempSection: TopicSection) {
    var tempArr = splitDesc.filter((s: string) => s.includes('##') && !s.includes('###'))
    var subsectionDescKey = true
    tempArr.forEach((s: string) => {
        var parentSubsection = new SubSection()
        parentSubsection.title = s.replaceAll('#', '').trim()
        for (let i = splitDesc.indexOf(s) + 1; i < splitDesc.length; i++) {
            let currentElement = splitDesc[i]
            if (currentElement.includes('###')) {
                
                var childSubsection = new SubSection()
                childSubsection.title = currentElement.replaceAll('#', '').trim()
                for (let j = splitDesc.indexOf(currentElement) + 1; j < splitDesc.length; j++) {
                    let childElement = splitDesc[j]
                    if (childElement.includes('#')) {
                        break
                    } 
                    else if (childElement.includes('**_')) {
                        childSubsection.desc.push(childElement.replaceAll('_**.', ' -').replaceAll('**_','')) 
                    }
                    else {
                        childSubsection.desc.push(childElement.replaceAll('_', ''))
                    }
                }
                parentSubsection.subSections.push(childSubsection)
                subsectionDescKey = false
            }
            if (subsectionDescKey) {
                parentSubsection.desc.push(currentElement)
            }
        }
        tempSection.subSections.push(parentSubsection)
    })
}

export default hashSubsections