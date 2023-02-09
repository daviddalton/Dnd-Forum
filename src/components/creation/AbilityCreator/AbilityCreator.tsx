import { useState } from "react";
import { AbilityScoreCard } from "./abilityScoreCard";
import ManualRolledArray from "./ManualRolledArray";
import StandardArray from "./StandardArray";
import {  AccordionSummary, styled, Typography } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { ExpandMore } from "@mui/icons-material";
import ScoreSheet from "./ScoreSheet";




const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));


function AbilityCreator(props: any) {
    
    const [method, setMethod] = useState('Standard Array')
    const handleMethodChange = (method: string) => {
        setMethod(method);
    };
    const handleMouseEnter = (e: any) => {
        e.target.style.background = "#3A3A3A"
        e.target.style.color = 'white'
    }
    const handleMouseLeave = (e: any) => {
        e.target.style.background = "#C7C7C7"
        e.target.style.color = "black"
    }


    const strength = new AbilityScoreCard()
        strength.name = "Strength"
        strength.scores[2].value = props.aScoreStrength
        strength.scores[3].value = strength.findRacialBones(props.race)
        strength.scores[4].value = '+0'
        strength.scores[5].value = '+0'
        strength.scores[6].value = '+0'
        strength.scores[0].value = strength.findTotal()
        strength.scores[1].value = strength.findModifier()
    const dexterity = new AbilityScoreCard()
        dexterity.name = "Dexterity"
        dexterity.total = props.aScoreDexterity
        dexterity.scores[2].value = props.aScoreDexterity
        dexterity.scores[3].value = dexterity.findRacialBones(props.race)
        dexterity.scores[4].value = '+0'
        dexterity.scores[5].value = '+0'
        dexterity.scores[6].value = '+0'
        dexterity.scores[0].value = dexterity.findTotal()
        dexterity.scores[1].value = dexterity.findModifier()
    const constitution = new AbilityScoreCard()
        constitution.name = "Constitution"
        constitution.total = props.aScoreCon
        constitution.scores[2].value = props.aScoreCon
        constitution.scores[3].value = constitution.findRacialBones(props.race)
        constitution.scores[4].value = '+0'
        constitution.scores[5].value = '+0'
        constitution.scores[6].value = '+0'
        constitution.scores[0].value = constitution.findTotal()
        constitution.scores[1].value = constitution.findModifier()
    const intelligence = new AbilityScoreCard()
        intelligence.name = "Intelligence"
        intelligence.total = props.aScoreIntel
        intelligence.scores[2].value = props.aScoreIntel
        intelligence.scores[3].value = intelligence.findRacialBones(props.race)
        intelligence.scores[4].value = '+0'
        intelligence.scores[5].value = '+0'
        intelligence.scores[6].value = '+0'
        intelligence.scores[0].value = intelligence.findTotal()
        intelligence.scores[1].value = intelligence.findModifier()
    const wisdom = new AbilityScoreCard()
        wisdom.name = "Wisdom"
        wisdom.total = props.aScoreWis
        wisdom.scores[2].value = props.aScoreWis
        wisdom.scores[3].value = wisdom.findRacialBones(props.race)
        wisdom.scores[4].value = '+0'
        wisdom.scores[5].value = '+0'
        wisdom.scores[6].value = '+0'
        wisdom.scores[0].value = wisdom.findTotal()
        wisdom.scores[1].value = wisdom.findModifier()
    const charisma = new AbilityScoreCard()
        charisma.name = "Charisma"
        charisma.total = props.aScoreCharisma
        charisma.scores[2].value = props.aScoreCharisma
        charisma.scores[3].value = charisma.findRacialBones(props.race)
        charisma.scores[4].value = '+0'
        charisma.scores[5].value = '+0'
        charisma.scores[6].value = '+0'
        charisma.scores[0].value = charisma.findTotal()
        charisma.scores[1].value = charisma.findModifier()


        const abilityScores = [strength, dexterity, constitution, intelligence, wisdom, charisma]

    return (
        
        <div
            style={{
                background: '#454545',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: '920px',
                height: 'fit-content',
                zIndex: '-5'
            }}>
                <h1>Character Abilities</h1>
                <div style={{
                    width: '713px',
                    border: '1px #2C2C2C solid',
                    background: '#2C2C2C',
                    boxShadow: '0px 2px 2px 0px #00000040'}}></div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'fit-content',
                        width: '300px'
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                                height: '40px',
                                fontSize: '20px',
                                width: '300px',
                            }}>
                                Choose a method
                        </div>
                        <div
                            style={{
                                background: 'white',
                                height: 'fit-content',
                                marginTop: '10px',
                                width: '300px',
                                border: '1px white solid'
                            }}>
                                <Accordion
                                    style={{
                                        backgroundColor: '#3A3A3A',
                                        color: 'white',
                                        fontSize: '20px',
                                        boxShadow: '0px 4px 4px 0px #00000040'

                                    }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore style={{
                                            color: '#E6E6E6'
                                        }}/>}>

                                        <Typography
                                            style={{
                                                fontFamily: 'buenard',
                                                
                                                fontSize: '20px'
                                                
                                            }}>
                                            {method}
                                        </Typography>
                                    </AccordionSummary>
                                    <div
                                        style={{
                                            backgroundColor: '#C7C7C7',
                                            color: 'black',
                                            padding: '10px',
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleMethodChange("Standard Array")}
                                        onMouseEnter={(e) => handleMouseEnter(e)}
                                        onMouseLeave={(e) => handleMouseLeave(e)}>
                                                Standard Array
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: '#C7C7C7',
                                            marginTop: '2px',
                                            color: 'black',
                                            padding: '10px',
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleMethodChange("Manual / Rolled")}
                                        onMouseEnter={(e) => handleMouseEnter(e)}
                                        onMouseLeave={(e) => handleMouseLeave(e)}>
                                                    Manual / Rolled
                                    </div>
                                    <div
                                        style={{
                                            color: 'black',
                                            backgroundColor: '#C7C7C7',
                                            marginTop: '2px',
                                            padding: '10px',
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleMethodChange("Point By")}
                                        onMouseEnter={(e) => handleMouseEnter(e)}
                                        onMouseLeave={(e) => handleMouseLeave(e)}>
                                                    Point By
                                    </div>
                                </Accordion>
                        </div>
                </div>
                {method === 'Standard Array' ? (
                    <StandardArray 
                    dexterity={props.dexterity}
                    constitution={props.constitution}
                    intelligence={props.intelligence}
                    wisdom={props.wisdom}
                    charisma={props.charisma} 
                    setDexterity={props.setDexterity}
                    setConstitution={props.setConstitution}
                    setIntelligence={props.setIntelligence}
                    setWisdom={props.setWisdom}
                    setCharisma={props.setCharisma}
                    strength={props.strength}
                    setStrength={props.setStrength}
                    aScoreStrength={props.aScoreStrength}
                    aScoreDexterity={props.aScoreDexterity}
                    aScoreCon={props.aScoreCon}
                    aScoreIntel={props.aScoreIntel}
                    aScoreWis={props.aScoreWis}
                    aScoreCharisma={props.aScoreCharisma}
                    aScoreSetStrength={props.aScoreSetStrength}
                    aScoreSetDexterity={props.aScoreSetDexterity}
                    aScoreSetCon={props.aScoreSetCon}
                    aScoreSetIntel={props.aScoreSetIntel}
                    aScoreSetWis={props.aScoreSetWis}
                    aScoreSetCharisma={props.aScoreSetCharisma}/>
                ): method === 'Manual / Rolled' ? (
                    <ManualRolledArray />
                ): (
                    <h1>Nothing yet</h1>
                )}
                <ScoreSheet 
                    abilityScores={abilityScores}
                />
    </div>
        
    
    )

}

export default AbilityCreator