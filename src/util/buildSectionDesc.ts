import { TopicSection } from "../model/Character/TopicSection.class"




function buildSectionDesc(tempSection: TopicSection, splicedData: string[], charToStopAt: string, replacementChar?: string) {
    for (let subString of splicedData) {
        if (replacementChar !== undefined) {
            if (subString.includes(charToStopAt)) { break } 
            else { tempSection.desc.push(subString.replaceAll(replacementChar, '').replaceAll('*','').replaceAll('_','')) }
        } else {
            if (subString.includes(charToStopAt) || subString.includes('|')) { break } 
            else { tempSection.desc.push(subString.replaceAll('*','').replaceAll('_','')) }
        }

    }
}

export default buildSectionDesc