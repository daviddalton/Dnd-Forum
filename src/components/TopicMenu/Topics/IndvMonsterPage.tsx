import { useParams } from "react-router-dom";
import Monster from "../../../model/Character/Monster";
import React, { useEffect, useState } from "react"
import axios from 'axios';
import { AbilityScore } from "../../../model/Character/AbilityScore";
import { useWidth } from "../../WidthContext";



function IndvMonsterPage(props: any) {

    const { monsterSlug } = useParams()
    const [monsterData, setMonsterData] = useState<Monster>()
    const abilityShortNames = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
    const monsterAbilityScores = [monsterData?.strength, monsterData?.dexterity, monsterData?.constitution, monsterData?.intelligence, monsterData?.wisdom, monsterData?.charisma]
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
    
    console.log(monsterData)
    return (
        <div
            style={{
                marginTop: '20px',
                border: '1px white solid',
                width: '100%',
                color: 'white',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div
                    style={{
                        border: '1px white solid',
                        margin: '5px',
                        minWidth: '320px',
                        maxWidth: '780px',
                        width: '100%',
                        opacity: '.6'
                    }}>
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
                            monsterChallengeRating={monsterData?.chanllenge_rating}/>
                </div>
        </div>
    )
}

function MonsterTitle(props: any) {
    return (
        <div
            style={{
                border: '1px white solid',
                margin: '5px',
                display: 'flex',

                background: '#761e21'
            }}>
                <h1>{props.monsterName}</h1>
        </div>
    )
}

function MonsterSizeTypeAlignment(props: any) {
    return (
        <>
        <div style={{ borderTop: '1px white solid' }} />
        <div
            style={{
                border: '1px white solid',
                margin: '5px',
                display: 'flex',
            }}>
                {props.monsterSize} | {props.monsterType} | {props.monsterAlignment}
        </div>
        </>
    )
}

function MonsterArmorHPSpeed(props: any) {
    return (
        <div
            style={{
                border: '1px white solid',
                display: 'flex',
                margin: '5px',
                flexDirection: "column"
            }}>
                <div>
                    <strong>Armor Class: </strong>{props.monsterArmor}
                </div>
                <div>
                    <strong>Hit Points: </strong>{props.monsterHitPoints} ({props.monsterHitPointsDesc})
                </div>
                <div
                    style={{
                        display: 'flex'
                    }}>
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
        <div
            style={{
                border: '1px white solid',
                margin: '5px',
                display: 'flex',
                justifyContent: "space-evenly"
            }}>
                {props.abilityScores.map((abilityScore: AbilityScore) => (
                <div
                style={{

                }}>
                    <div
                        style={{
                            margin: '5px',
                            display: 'flex',
                            justifyContent: "center"
                        }}>
                            <strong>{abilityScore.scoreName}</strong>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: width.width! > 450 ? ('row'):('column')
                    }}>
                        <div
                            style={{
                                margin: '5px',
                                display: 'flex',
                                justifyContent: "center"
                            }}>
                                {abilityScore.total} 
                        </div>
                        <div
                            style={{
                                margin: '5px',
                                display: 'flex',
                                justifyContent: "center"
                            }}>
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
        <div
            style={{
                border: '1px white solid',
                margin: '5px'
            }}>
                <div
                    style={{
                        display: 'flex',
                    }}>
                        <div
                            style={{
                                border: '1px white solid',
                                margin: '5px'
                            }}>
                            <strong>Saving Throws: </strong> 
                        </div>
                    {props.abilityScores.map((abilityScores: AbilityScore) => (
                        <div
                            style={{
                                border: '1px white solid',
                                margin: '5px'
                            }}>
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
export default IndvMonsterPage


