import { SubSection } from '../../../model/Character/SubSection.class'
import { TopicSection } from '../../../model/Character/TopicSection.class'
import GeneralSubsectionContainer from '../../../util/GeneralSubsectionContainer'
import SectionTitleDesc from '../../../util/SectionTitleDesc'
import '../../styles/alignment.css'


function AlignmentPage(props: any) {
    var tempSection = new TopicSection()
    var alignmentAndDesc: string[] | undefined = []
    var alignmentTitlesAndDesc: string[][] = []

    function handleAlignment(splitDesc: string[]) {
        if (splitDesc !== undefined) {
            alignmentAndDesc = splitDesc.filter((s: string) => s.includes('**'))
            alignmentAndDesc.forEach((s: string) => alignmentTitlesAndDesc?.push(s.replaceAll('*', '').replaceAll('(', '').split(')')))
            alignmentTitlesAndDesc[9].unshift('Unaligned UA')
            alignmentTitlesAndDesc.forEach((s: string[]) => s[0] + ')')
            alignmentTitlesAndDesc.forEach((s: string[]) => {
                var tempSubsection = new SubSection()
                tempSubsection.title = s[0]
                tempSubsection.desc.push(s[1])
                tempSection.subSections.push(tempSubsection)
            })
            
            splitDesc.forEach((s: string) => {
                if (s.includes('##') && !s.includes('*')) {
                    s.replaceAll('#', '').trim()
                    tempSection.bottomTitle = s
                } else if (!s.includes('#') && !s.includes('*')) {
                    tempSection.desc.push(s)
                }
            })
            return tempSection
        }
    }
    handleAlignment(props.splitDesc)
    return (
        <div className="alignment-content-container">
            <SectionTitleDesc name={props.name} tempSection={tempSection}/>
            <GeneralSubsectionContainer tempSection={tempSection} />
        </div>
    )
}

export default AlignmentPage