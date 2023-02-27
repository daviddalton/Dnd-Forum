import { AccordionSummary, Typography } from "@mui/material";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { AbilityScore, Score } from "../../../model/Character/AbilityScore";
import { Accordion } from "../../../util/Constants";
import React from "react";
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'
import '../../styles/standardMethod.css';

function StandardMethod(props: any) {
    const [scoreAccordions, setScoreAccordions] = useState([props.strength, props.dexterity, props.constitution, props.intelligence, props.wisdom, props.charisma])
    const [render, setRender] = useState(false)
    const [trueScores, setTrueScores] = useState<string[]>([])

    const HandleScoreClick = (abilityScore: AbilityScore, score: Score) => {
        switch(abilityScore.scoreName) {
            case 'STRENGTH': props.setStrength(new AbilityScore("STRENGTH", score.value));
                break;
            case 'DEXTERITY': props.setDexterity(new AbilityScore('DEXTERITY', score.value));
                break;
            case 'CONSTITUTION': props.setConstitution(new AbilityScore("CONSTITUTION", score.value));
                break;
            case 'INTELLIGENCE': props.setIntelligence(new AbilityScore("INTELLIGENCE", score.value));
                break;
            case 'WISDOM': props.setWisdom(new AbilityScore("WISDOM", score.value));
                break;
            case 'CHARISMA': props.setCharisma(new AbilityScore("CHARISMA", score.value));
                break;
        }
    }
    
    React.useEffect(() => {
        setScoreAccordions([props.strength, props.dexterity, props.constitution, props.intelligence, props.wisdom, props.charisma])
    }, [props.charisma, props.constitution, props.dexterity, props.intelligence, props.strength, props.wisdom])

    React.useEffect(() => {
        var tempScores = props.scores;
        var tempTrueScores : string[] = []
        tempScores.forEach((score: Score) => {
            scoreAccordions.forEach((ability: AbilityScore) => {
                if (score.value === ability.total && ability.total !== '--') {
                    score.disabled = true
                    tempTrueScores.push(score.value)
                    props.setScores(tempScores)
                }
                setTrueScores(tempTrueScores)
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scoreAccordions])

    React.useEffect(() => {
        var tempScores = props.scores;
        tempScores.forEach((score: Score) => {
            if (!trueScores.includes(score.value)) {
                score.disabled = false
                props.setScores(tempScores)
                setRender(!render)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trueScores])

    return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
        <div className="standard-method-container">
                {scoreAccordions.map((abilityScore: AbilityScore) => (
                    <div>
                        <div className="standard-method-ability-score-name">
                                {abilityScore.scoreName}
                        </div>
                        <Accordion className="standard-method-ability-score-accordion" 
                            key={abilityScore.scoreName}
                            style={{ background:'rgba(76,81,88)' }}>
                            <AccordionSummary className="standard-method-ability-score-summary"
                                expandIcon={<ExpandMore style={{ color: 'rgba(255,255,255,.6)' }} />}
                                style={{
                                    borderRadius: '10px'
                                }}>
                                <Typography style={{ color: 'rgba(255,255,255,.6)' }}>
                                    {abilityScore.total}
                                </Typography>
                            </AccordionSummary>
                            <ScoreButtons scores={props.scores} HandleScoreClick={HandleScoreClick} abilityScore={abilityScore} />
                        </Accordion>
                    </div>
                ))}
        </div>
        </CSSTransition>
    )
}

function ScoreButtons(props: any) {
    return (
        <>
        {props.scores.map((score: Score) => (
            <div className="standard-method-score-container">
                    {score.disabled === false ? (
                        <button className="standard-method-score-button"
                            disabled={score.disabled}
                            type="button"
                            onClick={() => props.HandleScoreClick(props.abilityScore, score)}
                            style={{
                                borderTopRightRadius: score.value === '--' ? ('10px'):(''),
                                borderTopLeftRadius: score.value === '--' ? ('10px'):(''),
                                borderBottomLeftRadius: score.value === '15' ? ('10px'):(''),
                                borderBottomRightRadius: score.value === '15' ? ('10px'):('')
                            }}>
                            {score.value}
                        </button>
                    ):(
                        <button className="standard-method-disabled-score-button"
                            disabled={score.disabled}
                            type="button"
                            onClick={() => props.HandleScoreClick(props.abilityScore, score)}
                            style={{
                                borderTopRightRadius: score.value === '--' ? ('10px'):(''),
                                borderTopLeftRadius: score.value === '--' ? ('10px'):(''),
                                borderBottomLeftRadius: score.value === '15' ? ('10px'):(''),
                                borderBottomRightRadius: score.value === '15' ? ('10px'):('')
                            }}>
                            {score.value}
                        </button>
                    )}
            </div>
        ))}
        </>
    )
}
export default StandardMethod