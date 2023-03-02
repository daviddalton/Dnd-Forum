import { useParams } from "react-router-dom";
import Monster from "../../../model/Character/Monster";
import React, { useEffect, useState } from "react"
import axios from 'axios';
import { AbilityScore } from "../../../model/Character/AbilityScore";
import { useWidth } from "../../WidthContext";
import '../../styles/indvMonster.css'



function IndvMonsterPage(props: any) {

    const { monsterSlug } = useParams()
    const [monsterData, setMonsterData] = useState<Monster>()
    const abilityShortNames = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
    const monsterAbilityScores = [monsterData?.strength, monsterData?.dexterity, monsterData?.constitution, monsterData?.intelligence, monsterData?.wisdom, monsterData?.charisma]
    const monsterTraits = [monsterData?.damage_resistances, monsterData?.damage_immunities, monsterData?.senses, monsterData?.languages, monsterData?.challenge_rating]
    const [abilityScores, setAbilityScores] = useState<AbilityScore[]>([])

    React.useEffect(() => {
        axios.get(`https://api.open5e.com/monsters/${monsterSlug}`)
            .then(response => {
                setMonsterData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [monsterSlug])

    React.useEffect(() => {
        if (monsterData) {
            var tempAbilityArray: AbilityScore[] = []
            for(let i = 0; i < abilityShortNames.length; i++) {
                let tempAbilityScore = new AbilityScore(abilityShortNames[i], monsterAbilityScores[i]!.toString(),[])
                tempAbilityScore.modifier = tempAbilityScore.findModifier()
                tempAbilityArray.push(tempAbilityScore)
            }
            setAbilityScores(tempAbilityArray)
        }
    }, [monsterData])

    return (
        <div className="indv-monster-page-container">
                <div className="indv-monster-content-container">
                        <MonsterTitle monsterName={monsterData?.name} />
                        <MonsterSizeTypeAlignment 
                            monsterSize={monsterData?.size} 
                            monsterType={monsterData?.type}
                            monsterAlignment={monsterData?.alignment} />
                        <MonsterArmorHPSpeed 
                            monsterArmor={monsterData?.armor_class}  
                            monsterHitPoints={monsterData?.hit_points}
                            monsterHitPointsDesc={monsterData?.hit_dice}
                            monsterSpeed={monsterData?.speed} />
                        <MonsterAbilityScores 
                            monsterStrength={monsterData?.strength}
                            monsterDexterity={monsterData?.dexterity}
                            monsterConstitution={monsterData?.constitution}
                            monsterIntelligence={monsterData?.intelligence}
                            monsterWisdom={monsterData?.wisdom}
                            monsterCharisma={monsterData?.charisma}
                            abilityScores={abilityScores}/>
                        <MonsterTraits 
                            abilityScores={abilityScores}
                            monsterResistences={monsterData?.damage_resistances}
                            monsterDamageImmunities={monsterData?.damage_immunities}
                            monsterSenses={monsterData?.senses}
                            monsterLanguages={monsterData?.languages}
                            monsterChallengeRating={monsterData?.challenge_rating}/>
                        <MonsterSpecialAbilities 
                            monsterSpecialAbilities={monsterData?.special_abilities}/>
                        <MonsterActions 
                            monsterActions={monsterData?.actions}/>
                </div>
        </div>
    )
}

function MonsterTitle(props: any) {
    return (
        <div className="indv-monster-title-container">
                <h1>{props.monsterName}</h1>
        </div>
    )
}

function MonsterSizeTypeAlignment(props: any) {
    return (
        <>
        <div className="indv-monster-size-alignment-type-container">
                {props.monsterSize} | {props.monsterType} | {props.monsterAlignment}
        </div>
        </>
    )
}

function MonsterArmorHPSpeed(props: any) {
    return (
        <div className="indv-monster-armor-hp-speed-container">
                <div>
                    <strong>Armor Class: </strong>{props.monsterArmor}
                </div>
                <div>
                    <strong>Hit Points: </strong>{props.monsterHitPoints} ({props.monsterHitPointsDesc})
                </div>
                <div style={{ display: 'flex' }}>
                    <strong>Speed:</strong> 
                    <div style={{ paddingLeft: '5px'}}>{props.monsterSpeed?.burrow !== undefined ? (<span> Burrow - {props.monsterSpeed?.burrow} ft.</span>):(<div></div>)}</div>
                    <div style={{ paddingLeft: '5px'}}>{props.monsterSpeed?.swim !== undefined ? (<span> Swim - {props.monsterSpeed?.swim} ft.</span>):(<div></div>)}</div>
                    <div style={{ paddingLeft: '5px'}}>{props.monsterSpeed?.walk !== undefined ? (<span> Walk - {props.monsterSpeed?.walk} ft.</span>):(<div></div>)}</div>
                </div>
        </div>
    )
}

function MonsterAbilityScores(props: any) {
    const width = useWidth()

    return (
        <div className="indv-monster-ability-score-container">
                {props.abilityScores.map((abilityScore: AbilityScore, index: number) => (
                <div key={index}>
                    <div className="indv-monster-ability-score-name-container">
                            <strong>{abilityScore.scoreName}</strong>
                    </div>
                    <div 
                        style={{
                        display: 'flex',
                        flexDirection: width.width! > 450 ? ('row'):('column')
                    }}>
                        <div className="indv-monster-score-container">
                                {abilityScore.total} 
                        </div>
                        <div className="indv-monster-modifier-container">
                                ({abilityScore.modifier})
                        </div>
                    </div>
                </div>
                ))}
        </div>
    )
}

function MonsterTraits(props: any) {
    return (
        <div className="indv-monster-traits-container">
                <div style={{ display: 'flex' }}>
                        <div style={{ marginTop: '5px' }}>
                            <strong>Saving Throws: </strong> 
                        </div>
                    {props.abilityScores.map((abilityScores: AbilityScore, index: number) => (
                        <div key={index}
                            style={{ margin: '5px' }}>
                                {abilityScores.scoreName} {abilityScores.modifier}
                        </div>
                    ))}
                </div>
                <div>
                    <strong>Damage Resistances:</strong> {props.monsterResistences}
                </div>
                <div>
                    <strong>Damage Immunities:</strong> {props.monsterDamageImmunities}
                </div>
                <div>
                    <strong>Senses:</strong> {props.monsterSenses}
                </div>
                <div>
                    <strong>Languages:</strong> {props.monsterLanguages}
                </div>
                <div>
                    <strong>Challenge:</strong> {props.monsterChallengeRating}
                </div>
        </div>
    )
}

function MonsterSpecialAbilities(props: any) {
    return (
        <div className="indv-monster-special-abilities-container">
                {props.monsterSpecialAbilities?.map((special_abilities: {name: string, desc: string}, index: number) => (
                    <div key={index}
                        style={{ margin: '5px' }}>
                            <strong>{special_abilities.name}</strong> - {special_abilities.desc}
                    </div>
                ))}
        </div>
    )
}

function MonsterActions(props: any) {
    return (
        <div style={{ margin: '5px' }}>
                <div className="indv-monster-actions-title-container">
                        <h2>Actions</h2>
                </div>
                {props.monsterActions?.map((action: {name: string, desc: string}, index: number) => (
                    <div key={index}
                        style={{ margin: '5px' }}>
                            <strong>{action.name}</strong> - {action.desc}
                    </div>
                ))}
        </div>
    )
}
export default IndvMonsterPage


