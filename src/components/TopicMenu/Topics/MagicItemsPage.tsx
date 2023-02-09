import { useQuery } from "@tanstack/react-query"
import fetch from "../../../api/fetch";
import { MagicItems } from "../../../model/Character/MagicItems/MagicItem.interface"
import { MagicItem } from "../../../model/Character/MagicItems/MagicItems.interface"
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import '../../styles/magicItems.css'

function fetchPage(page: string | undefined): Promise<MagicItems> {
    return fetch(page)
}
function MagicItemsPage() {
    var pages = ['https://api.open5e.com/magicitems/?page=1',
                'https://api.open5e.com/magicitems/?page=2',
                'https://api.open5e.com/magicitems/?page=3',
                'https://api.open5e.com/magicitems/?page=4',
                'https://api.open5e.com/magicitems/?page=5'
            ]
    var numbers = [
        '1', '2', '3', '4', '5' 
    ]
    var totalData: MagicItems[] = []
    function SetData() {
        for (let i = 0; i < pages.length; i++) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var {data, status} = useQuery([numbers[i]], () => fetchPage(pages[i]))
            if (data !== undefined) {
                totalData.push(data)
            }
        }
    }

    SetData()

    if (totalData.length > 4) {
        totalData[0].range = 'A - Dec'
        totalData[1].range = 'Def - Jav'
        totalData[2].range = 'Lan - Rin'
        totalData[3].range = 'Rin - Sta'
        totalData[4].range = 'Sta - Orb'
    }

    return (
        <div className="magic-items-container">
                <div className="magic-items-title-accordion-container">
                    <div className="magic-items-title">
                            <h1>Magic Items</h1>
                    </div>
                    <div>
                            <SpellAccordion totalData={totalData} />
                    </div>
                </div>
        </div>
    )
}

function SpellAccordion(props: any) {
    return (
        <>
            {props.totalData.map((items: MagicItems) => (
                <Accordion>
                    <AccordionSummary
                        style={{ background: '#393E46', color: 'white'}}>
                        <Typography>
                            {items.range}
                        </Typography>
                    </AccordionSummary>
                    <div className="magic-item-table-container">
                                <div className="magic-item-table-header-container">
                                        <div className="magic-item-header-name">
                                            name
                                        </div>
                                        <div className="magic-item-header-rarity">
                                            rarity
                                        </div>
                                        <div className="magic-item-header-type">
                                            Type
                                        </div>
                                </div>
                                {items.results.map((item: MagicItem) => (
                                    <div className="magic-item-indv-item-container">
                                        <div className="magic-item-indv-name">
                                            {item.name}
                                        </div>
                                        <div className="magic-item-indv-rarity">
                                            {item.rarity}
                                        </div>
                                        <div className="magic-item-indv-type">
                                            {item.type}
                                        </div>
                                    </div>
                                ))}
                        </div>
                </Accordion>
            ))}
        </>
    )
}
export default MagicItemsPage