import { TopicSection } from "../../../model/Character/TopicSection.class"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildTable from "../../../util/buildTable"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"

function TradeGoodsPage(props: any) {
    var tempSection = new TopicSection()

    function handleTradeGoods(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '*', '')
        buildTable(splitDesc, tempSection, 2)
        console.log(tempSection)
    }

    handleTradeGoods(props.splitDesc)

    return (
        <div
            style={{
                marginTop: '20px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} />
                <TopicSectionTable tempSection={tempSection} />
        </div>
    )
}

export default TradeGoodsPage