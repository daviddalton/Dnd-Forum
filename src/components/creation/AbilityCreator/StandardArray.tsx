import { AccordionSummary, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import {  styled } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { ExpandMore } from "@mui/icons-material";

class AbilityScore {
    scoreName: string;
    total: string
    availableScores: score[]

    constructor(scoreName: string, total: string, availableScores: score[]) {
        this.scoreName = scoreName
        this.total = total
        this.availableScores = availableScores
    }
}
class score {
    value: string;
    disabled: boolean

    constructor(value: string, disabled: boolean) {
        this.value = value
        this.disabled = disabled
    }
}

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

function StandardArray(props: any) {
    


    const [abilityScores, setAbilityScores] = useState([props.strength, props.dexterity, props.constitution, props.intelligence, props.wisdom, props.charisma])
    function unDisableValues(ability: AbilityScore) {
        var unDisableIndex = ability.availableScores.findIndex((sco) => sco.value === ability.total)
        abilityScores.forEach((sco) => sco.availableScores[unDisableIndex].disabled = false)
    }
    function disableValues(ability: AbilityScore, valueClicked: string) {
        if (valueClicked !== '--') {
            var disableIndex = ability.availableScores.findIndex((sco) => sco.value === valueClicked)
            abilityScores.forEach((sco) => sco.availableScores[disableIndex].disabled = true)
        }
    }
    const handleScoreChange = (ability: AbilityScore, valueClicked: string) => {
        unDisableValues(ability)
        ability.total = valueClicked
        if (ability.scoreName.includes('STRENGTH')) { 
            props.setStrength(ability)
            props.aScoreSetStrength(valueClicked)
        }
        else if (ability.scoreName.includes('DEXTERITY')) { 
            props.setDexterity(ability)
            props.aScoreSetDexterity(valueClicked)
        }
        else if (ability.scoreName.includes('CONSTITUTION')) {
            props.setConstitution(ability)
            props.aScoreSetCon(valueClicked)
        }
        else if (ability.scoreName.includes('INTELLIGENCE')) {
            props.setIntelligence(ability)
            props.aScoreSetIntel(valueClicked)
        }
        else if (ability.scoreName.includes('WISDOM')) {
            props.setWisdom(ability)
            props.aScoreSetWis(valueClicked)
        }
        else if (ability.scoreName.includes('CHARISMA')) {
            props.setCharisma(ability)
            props.aScoreSetCharisma(valueClicked)
        }
        disableValues(ability, valueClicked)
        setAbilityScores([props.strength, props.dexterity, props.constitution, props.intelligence, props.wisdom, props.charisma])
    }

    return(
        <div
            style={{
                display: 'flex',
                marginTop: '20px',
                justifyContent: 'center',
                height: 'fit-content',
                }}>
            {abilityScores.map((aScore) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '1px',
                        height: 'fit-content'
                    }}
                    key={aScore.scoreName}>
                    <InputLabel
                        id="standard-array-label"
                        style={{
                            color: 'white',
                            fontSize: '12px'
                        }}>
                            {aScore.scoreName}
                    </InputLabel>
                    <Accordion
                        style={{
                            width: '100px',
                            margin: '0px 5px 0px 5px',
                            background: '#D8D8D8'
                        }}>
                        <AccordionSummary 
                            expandIcon={<ExpandMore />}
                            style={{
                                
                            }}>
                            <Typography>
                                {aScore.total}
                            </Typography>
                        </AccordionSummary>
                        {aScore.availableScores.map((selScore: score) => (
                            <Accordion
                                key={selScore.value}
                                defaultValue={selScore.value}
                                style={{
                                    display: "flex",
                                    marginTop: "1px",
                                    alignItems: "center",
                                    background: '#3A3A3A',
                                    fontSize: '20px',
                                    color: 'white',
                                    height: '40px',
                                    width: '98px',
                                    cursor: 'pointer'
                                }}
                                disabled={selScore.disabled}
                                onClick={(valueClicked) => handleScoreChange(aScore, valueClicked.currentTarget.outerText)}>
                                    <AccordionSummary>
                                        {selScore.value}
                                    </AccordionSummary>
                            </Accordion>
                            ))}

                    </Accordion>
                </div>
            ))}
        </div>
    )
}

export default StandardArray