import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetch from "../../../api/fetch";
import CharacterClass from "../../../model/Character/Character/CharacterClass.interface";
import { classDesc } from "../../../model/Character/classDesc";
import { skill } from "../../../model/Character/skill";
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import React, { useState } from "react";
import { CharEquipment } from "../../../model/Character/CharEquipment";
import { EquipmentOptions } from "../../../model/Character/EquipmentOption";
import recursiveCleaning from "../../../util/recursiveCleaning";
import { TopicSection } from "../../../model/Character/TopicSection.class";
import { SubSection } from "../../../model/Character/SubSection.class";
import buildTable from "../../../util/buildTable";
import TopicSectionTable from "../../../util/TopicSectionTable";
import '../../styles/characterClass.css'

function ClassPage() {
    var tempClassDesc = new classDesc()
    var tempCharEquipment = new CharEquipment()
    var tempSection = new TopicSection()

    const { classSlug } = useParams()
    const { data, status } = useQuery(['class', classSlug], FetchClass)
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    function handleResize() {
        setWidth(window.innerWidth)
    }

    function FetchClass(): Promise<CharacterClass> {
        return fetch(`https://api.open5e.com/classes/${classSlug}`)
    }
    function buildClassDesc(splitDesc: string[]) {
        buildSkillAndName(splitDesc, tempClassDesc)
        buildSkillDesc(splitDesc, tempClassDesc)
        buildSubPoint(splitDesc, tempClassDesc)

    }
    function buildSkillAndName(splitDesc: string[], tempClassDesc: classDesc) {
        for (let i = 0; i < splitDesc.length; i++) {
            let currentElement = splitDesc[i]
            if (currentElement.includes('#')) {
                var tempSkill = new skill()
                tempSkill.name = currentElement.replaceAll('#','').trim()
                tempSkill.index = i
                tempClassDesc.skills.push(tempSkill)
            }
        }
    }
    function buildSkillDesc(splitDesc: string[], tempClassDesc: classDesc) {
        for (let i = 0; i < splitDesc.length; i++) {
            let currentElement = splitDesc[i]
            if (!currentElement.includes('#') && !currentElement.includes('*')) {
                for (let j = i; j > -1; j--) {
                    let priorElement = splitDesc[j]
                    if (priorElement.includes('#')) {
                        var skillIndex = tempClassDesc.skills.findIndex((ski: skill) => ski.name === priorElement.replaceAll('#','').trim())
                        tempClassDesc.skills[skillIndex].desc.push(currentElement)
                        break
                    }
                }
            }
        }
    }
    function buildSubPoint(splitDesc: string[], tempClassDesc: classDesc) {
        for (let i = 0; i < splitDesc.length; i++) {
            let currentElement = splitDesc[i]
            if (currentElement.includes('*')) {
                var subPointArr  = currentElement.split('\n*')
                for (let j = i; j > -1; j--) {
                    let priorElement = splitDesc[j]
                    if (priorElement.includes('#')) {
                        var skillIndex = tempClassDesc.skills.findIndex((ski: skill) => ski.name === priorElement.replaceAll('#','').trim())
                        // eslint-disable-next-line no-loop-func
                        subPointArr.forEach((s: string) => tempClassDesc.skills[skillIndex].subPoint.push(s.replaceAll('*','').trim())) 
                        break
                    }
                }
            }
        }
    }
    function buildUnmarkedOption(splitEquipment: string[]) {
        var tempOption = new EquipmentOptions()
        var currentElement = splitEquipment[splitEquipment.length - 1]
        var splitCurrentElement = currentElement.replaceAll('*','').trim()
        tempOption.options.push(splitCurrentElement) 
        tempCharEquipment.options.push(tempOption)
    }
    function buildMarkedOptions(splitEquipment: string[]) {
        for (let i = 1; i < splitEquipment.length - 1; i++) {
            var tempOption = new EquipmentOptions()
            let currentElement = splitEquipment[i]
            if (currentElement !== ' ') {
                var splitCurrentElement = recursiveCleaning(currentElement, ['*', '(*a*)','(*b*) ','(*c*) '],'').trim()
                tempOption.options.push(splitCurrentElement)
                tempCharEquipment.options.push(tempOption)
            }
        }
    }
    function buildEquipment(splitEquipment: string[]) {
        tempCharEquipment.desc = splitEquipment[0]
        buildMarkedOptions(splitEquipment)
        buildUnmarkedOption(splitEquipment)
    }
    function buildSubsection(tempSection: TopicSection, data: string, title: string) {
        var tempSubSection = new SubSection()
        tempSubSection.title = title
        tempSubSection.desc.push(data)
        tempSection.subSections.push(tempSubSection)
    }
    function buildProficiency(tempSection: TopicSection, data: string, title: string) {
        var tempSubSection = new SubSection()
        tempSubSection.title = title
        tempSubSection.desc.push(data)
        tempSection.proficiencies.push(tempSubSection)
    }
 
    if (data !== undefined) {
        var splitDesc = data?.desc.split('\n \n')
        var splitEquipment = data?.equipment.split('\n')
        var splitTableData = []
        splitTableData.push(data.table)
        buildClassDesc(splitDesc)
        buildEquipment(splitEquipment)
        buildSubsection(tempSection, data.hit_dice, 'Hit Die:')
        buildSubsection(tempSection, data.hp_at_1st_level, 'HP at lvl. 1:')
        buildSubsection(tempSection, data.hp_at_higher_levels, 'HP for lvls 2+:')
        buildSubsection(tempSection, data.spellcasting_ability, 'Spell Casting Ability:')
        buildSubsection(tempSection, data.subtypes_name, 'Subtypes:')
        buildProficiency(tempSection, data.prof_armor, 'Armor Proficiencies:')
        buildSubsection(tempSection, data.prof_saving_throws, 'Saving Throws:')
        buildProficiency(tempSection, data.prof_skills, 'Skill Proficiencies:')
        buildProficiency(tempSection, data.prof_tools, 'Tool Proficiencies:')
        buildProficiency(tempSection, data.prof_weapons, 'Weapon Proficiencies:')
        buildTable(splitTableData, tempSection, 2)
        console.log(tempSection)
        console.log(splitTableData)
    }

    return<>
        <div className="class-page-main-container">
                <div className="class-page-title-container">
                        <div className="class-page-title-text">
                                <h1>{data?.name}</h1>
                        </div>
                </div>
                <div className="class-page-content-container">
                        <CharacterData width={width} tempSection={tempSection} />
                        <div className="class-page-proficiency-container">
                                <Proficiencies tempSection={tempSection} />
                        </div>
                        <div className="class-page-starting-equipment">
                            <CreateEquipment tempCharEquipment={tempCharEquipment} />
                        </div>
                        <div className="class-page-table-container">
                                <TopicSectionTable tempSection={tempSection} />
                        </div>
                        <div className="class-abilities-container">
                                <AbilitiesAccordion tempClassDesc={tempClassDesc} />
                        </div>
                </div>
        </div>
    </>
}

function CreateEquipment(props: any) {
    return (
        <>
                <div className="class-page-equipment-title">
                        <h2>Starting Equipment</h2>
                </div>
                <div className="class-page-equipment-desc">
                        {props.tempCharEquipment.desc}
                </div>
                {props.tempCharEquipment.options.map((op: EquipmentOptions) => (
                    <div className="class-page-indv-equipment-container">
                        {op.options.map((s: string) => (
                            <ul className="class-page-indv-equipment-text"> 
                                <li>{s}</li>
                            </ul>
                        ))}
                    </div>
                ))}
        </>
        
    )
}

function Proficiencies(props: any) {
    return (
        <>
        <div className="class-page-proficiency-title">
                <h2>Class Proficiencies</h2>
        </div>
        <div className="class-page-proficiency-panel">
        {props.tempSection.proficiencies.map((subSec: SubSection) => (
            <div className="class-page-indv-proficiency-container">
                    <div className="class-page-indv-proficiency-title">
                            {subSec.title}
                    </div>
                    {subSec.desc.map((des: string) => (
                        <div className="class-page-indv-proficiency-desc">
                                {des}
                        </div>
                    ))}
            </div>
        ))}
        </div>
        </>
    )
}
function CharacterData(props: any) {
    return (
        <>
            <div className="class-page-character-content-container"
            style={{
                flexDirection: props.width > 830 ? ('row'):('column')
            }}>
                <div className="class-page-character-image">
                        Image
                </div>
                <div className="class-page-character-desc-container">
                    {props.tempSection.subSections.map((subsec: SubSection) => (
                    <div className="class-page-indv-data-container">
                        <div className="class-page-character-indv-title">
                                {subsec.title}
                        </div>
                        {subsec.desc.map((des: string) => (
                            <div className="class-page-character-indv-desc">
                                    {des}
                            </div>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function AbilitiesAccordion(props: any) {
    return (
        <div className="class-page-abilities-subContainer">
            <div className="class-page-ability-title-container">
                    <h2>Abilities</h2>
            </div>
            {props.tempClassDesc.skills.map((ski: skill) => (
                <Accordion>
                    <AccordionSummary 
                        expandIcon={<ExpandMore style={{ color: 'white'}}/>}
                        style={{
                            background: '#393E46',
                            color: "white"
                        }}>
                        <Typography style={{ fontFamily: 'buenard'}}>
                            {ski.name}
                        </Typography>
                    </AccordionSummary>
                    {ski.desc.map((des: string) => (
                        <div className="class-page-indv-ability-desc">
                                {des}
                        </div>
                    ))}
                    {ski.subPoint.map((sp: string) => (
                        <div  className="class-page-indv-subpoint-text">
                                {sp}
                        </div>
                    ))}
                </Accordion>
            ))}
    </div>
    )
}
export default ClassPage