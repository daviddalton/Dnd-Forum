import { SubSection } from "../model/Character/SubSection.class"

function buildSubsectionOfSubsection(parentSubSection: SubSection, subSectionElements: string) {
    var tempSubSection = new SubSection()
    var tempElements = subSectionElements.replaceAll('*', '').split('_')
    tempSubSection.title = tempElements[1].replaceAll('.', '')
    tempSubSection.desc.push(tempElements[2].trim())
    parentSubSection.subSections.push(tempSubSection)
}

export default buildSubsectionOfSubsection