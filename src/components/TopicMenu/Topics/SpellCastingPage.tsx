import { TopicSection } from "../../../model/Character/TopicSection.class"
import hashSubsections from "../../../util/hashSubsections"


function SpellCastingPage(props: any) {
    var tempSection = new TopicSection()
    function handleSpellCastingPage(splitDesc: string[]) {
        hashSubsections(splitDesc, tempSection)
    }

    handleSpellCastingPage(props.splitDesc)
    return (
        <div
            style={{
                border: '1px white solid',
                marginTop: '20px'
            }}>

        </div>
    )
}

export default SpellCastingPage