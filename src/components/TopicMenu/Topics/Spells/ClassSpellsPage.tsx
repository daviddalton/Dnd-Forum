import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, dividerClasses, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SpellData from "../../../../api/SpellData";
import Spell from "../../../../model/Character/Spells/spell";
import '../../../styles/spells.css'

class Category {
    name!: string
    spellList!: Spell[]
}

const classSpellData = new SpellData()



function ClassSpellsPage() {
    function QueryPage(url: string, number: string, classSlug: string | undefined) {
        const { clazzSlug } = useParams()
        const { data } = useQuery([number], () => classSpellData.fetchSpells(url))
        if (data !== undefined && classSlug !== undefined) {
            var filteredData = data.results.filter((spell: Spell) => spell.dnd_class.includes(classSlug))
            return filteredData
        }
    }
    const { clazzSlug } = useParams()
    const totalSpells: Spell[] = []
    const pageOneData = QueryPage("https://api.open5e.com/spells/?page=1", '1', clazzSlug)
    const pageTwoData = QueryPage("https://api.open5e.com/spells/?page=2", '2,', clazzSlug)
    const pageThreeData = QueryPage("https://api.open5e.com/spells/?page=3", '3', clazzSlug)
    const pageFourData = QueryPage("https://api.open5e.com/spells/?page=4", '4', clazzSlug)
    const pageFiveData = QueryPage("https://api.open5e.com/spells/?page=5", '5', clazzSlug)
    const pageSixData = QueryPage("https://api.open5e.com/spells/?page=6", '6', clazzSlug)
    const pageSevenData = QueryPage("https://api.open5e.com/spells/?page=7", '7', clazzSlug)
    const pageEightData = QueryPage("https://api.open5e.com/spells/?page=8", '8', clazzSlug)
    const pageNineData = QueryPage("https://api.open5e.com/spells/?page=9", '9', clazzSlug)
    const pageTenData = QueryPage("https://api.open5e.com/spells/?page=10", '10', clazzSlug)
    const pageElevenData = QueryPage("https://api.open5e.com/spells/?page=11", '11', clazzSlug)
    const pageTwelveData = QueryPage("https://api.open5e.com/spells/?page=12", '12', clazzSlug)
    const pageThirteenData = QueryPage("https://api.open5e.com/spells/?page=13", '13', clazzSlug)
    const pageFourteenData = QueryPage("https://api.open5e.com/spells/?page=14", '14', clazzSlug)
    const pageFifteenData = QueryPage("https://api.open5e.com/spells/?page=15", '15', clazzSlug)
    const pageSixteenData = QueryPage("https://api.open5e.com/spells/?page=16", '16', clazzSlug)
    const pageSeventeenData = QueryPage("https://api.open5e.com/spells/?page=17", '17', clazzSlug)

    const pages = [
                    pageOneData, pageTwoData, pageThreeData, pageFourData, pageFiveData,
                    pageSixData, pageSevenData, pageEightData, pageNineData, pageTenData,
                    pageElevenData, pageTwelveData, pageThirteenData, pageFourteenData,
                    pageFifteenData, pageSixteenData, pageSeventeenData
                ]
    var cantrips = new Category()
    var firstLevelSpells = new Category()
    var secondLevelSpells = new Category()
    var thirdLevelSpells = new Category()
    var fourthLevelSpells = new Category()
    var fifthLevelSpells = new Category()
    function buildTotaldata() {
        for (let page of pages) {
            if(page !== undefined) {
                for (let spell of page) {
                    totalSpells.push(spell)
                }
            }
        }
    }
    function buildSpecificLevelSpells(level: string) {
        var tempArr: Spell[]
        tempArr = totalSpells.filter((spell: Spell) => spell.level === level)
        return tempArr
    }
    buildTotaldata()
    cantrips.spellList = buildSpecificLevelSpells('Cantrip')
    cantrips.name = 'Cantrips'
    firstLevelSpells.spellList = buildSpecificLevelSpells('1st-level')
    firstLevelSpells.name = 'First Level Spells'
    secondLevelSpells.spellList = buildSpecificLevelSpells('2nd-level')
    secondLevelSpells.name = 'Second Level Spells'
    thirdLevelSpells.spellList = buildSpecificLevelSpells('3rd-level')
    thirdLevelSpells.name = 'Third Level Spells'
    fourthLevelSpells.spellList = buildSpecificLevelSpells('4th-level')
    fourthLevelSpells.name = 'Fourth Level Spells'
    fifthLevelSpells.spellList = buildSpecificLevelSpells('5th-level')
    fifthLevelSpells.name = 'Fifth Level Spells'

    const spellCategories = [cantrips, firstLevelSpells, secondLevelSpells, thirdLevelSpells, fourthLevelSpells, fifthLevelSpells]

    return <>
        <div className="spells-category-container">
                {spellCategories.map((category: Category) => (
                <div className="idv-spell-category">
                    <Accordion className="spell-category-accordion">
                        <AccordionSummary 
                            className="spell-category-accordion-summary"
                            sx={{ background: '#393E46', color: 'white',  }}
                            expandIcon={<ExpandMore style={{ color: 'white'}}/>}>
                            <Typography style={{ fontFamily: 'buenard'}}>
                                {clazzSlug} {category.name}:
                            </Typography>
                        </AccordionSummary>
                        <div className="cateogry-div-titles-container">
                                    <div className="category-div-title-name">
                                            Spell Name
                                    </div>
                                    <div className="category-div-title-duration">
                                            Duration
                                    </div>
                                    <div className="category-div-title-range">
                                            Range
                                    </div>
                        </div>
                        {category.spellList.map((spell: Spell) => (
                            <div className="category-div-spell-container">
                                    <div className="category-div-spell-names">
                                            {spell.name}
                                    </div>
                                    <div className="category-div-spell-duration">
                                            {spell.duration}
                                    </div>
                                    <div className="category-div-spell-range">
                                            {spell.range}
                                    </div>
                            </div>
                        ))}
                    </Accordion>
            </div>
                ))}
        </div>
    </>
}

export default ClassSpellsPage