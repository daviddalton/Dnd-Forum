import { Paper, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCharacter } from "../controller";
import AbilityCreator from "./AbilityCreator/AbilityCreator";
import AppBarCreate from "./AppBarCreate";
import ClassCard from "./ClassCreator/ClassCard";
import RaceCard from "./RaceCreation/RaceCard";
import SettingsPage from "./SettingsCreator/SettingPage";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    width: '290px',
    margin: '10px',
    background: '#292929'
  }));
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

function CharCreation() {
    const [id, setId] = useState("")
    const [img, setImg] = useState("")
    const [level, setLevel] = useState("1")
    const [characterName, setCharacterName] = useState("")
    const [advancementType, setAdvancementType] = useState("Milestone")
    const [hitPointType, setHitPointType] = useState("Fixed")
    const [characterClass, setCharacterClass] = useState("")
    const [race, setRace] = useState("")
    const [background, setBackground] = useState("")
    const [alignment, setAlignment] = useState("")
    const [currentPage, setCurrentPage] = useState('Settings')
    const [aScoreStrength, aScoreSetStrength] = useState('--')
    const [aScoreDexterity, aScoreSetDexterity] = useState('--')
    const [aScoreCon, aScoreSetCon] = useState('--')
    const [aScoreIntel, aScoreSetIntel] = useState('--')
    const [aScoreWis, aScoreSetWis] = useState('--')
    const [aScoreCharisma, aScoreSetCharisma] = useState('--')
    const navigate = useNavigate();
    const [strength, setStrength] = useState(new AbilityScore(
        'STRENGTH',
        aScoreStrength,
        [
            new score('--', false),
            new score('8', false),
            new score('10', false),
            new score('12', false),
            new score('13', false),
            new score('14', false),
            new score('15', false)
        ]
    ))
    const [dexterity, setDexterity] = useState(new AbilityScore(
        'DEXTERITY',
        aScoreDexterity,
        [
            new score('--', false),
            new score('8', false),
            new score('10', false),
            new score('12', false),
            new score('13', false),
            new score('14', false),
            new score('15', false)
        ]
    ))
    const [constitution, setConstitution] = useState(new AbilityScore(
        'CONSTITUTION',
        aScoreCon,
        [
            new score('--', false),
            new score('8', false),
            new score('10', false),
            new score('12', false),
            new score('13', false),
            new score('14', false),
            new score('15', false)
        ]
    ))
    const [intelligence, setIntelligence] = useState(new AbilityScore(
        'INTELLIGENCE',
        aScoreIntel,
        [
            new score('--', false),
            new score('8', false),
            new score('10', false),
            new score('12', false),
            new score('13', false),
            new score('14', false),
            new score('15', false)
        ]
    ))
    const [wisdom, setWisdom] = useState(new AbilityScore(
        'WISDOM',
        aScoreWis,
        [
            new score('--', false),
            new score('8', false),
            new score('10', false),
            new score('12', false),
            new score('13', false),
            new score('14', false),
            new score('15', false)
        ]
    ))
    const [charisma, setCharisma] = useState(new AbilityScore(
        'CHARISMA',
        aScoreCharisma,
        [
            new score('--', false),
            new score('8', false),
            new score('10', false),
            new score('12', false),
            new score('13', false),
            new score('14', false),
            new score('15', false)
        ]
    ))
    const addNewCharacter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCharacter({
            characterName,
            advancementType,
            hitPointType,
            characterClass,
            race,
            background,
            alignment,
            level,
            aScoreStrength,
            aScoreDexterity,
            aScoreCon,
            aScoreIntel,
            aScoreWis,
            aScoreCharisma
            
        });
        console.log("Successfully add a new character");
        navigate("/create")
    }

    console.log(currentPage)
    return (
        <div style={{
            color: 'white',
            width: '100%',
            background: '#222831',
            border: '1px white solid',
            marginTop: '80px',
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            padding: '10px'
        }}>
            <div
                style={{
                    border: '1px white solid',
                    minWidth: '320px',
                    maxWidth: '780px',
                    width: '100%',
                }}>
            <AppBarCreate 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
                <form 
                    onSubmit={(e) => addNewCharacter(e)}
                    style={{

                    }}>
                {currentPage === 'Settings' ? (
                    <SettingsPage 
                        setCharacterName={setCharacterName} 
                        setAdvancementType={setAdvancementType}
                        nameSlug={characterName}
                        advancementType={advancementType}
                        setHitPointType={setHitPointType}
                        hitPointType={hitPointType}
                        setCurrentPage={setCurrentPage}
                    />
                ) : currentPage === 'Race' ? (
                    <>
                        <div>
                            <RaceCard 
                                race={race}
                                setRace={setRace}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </>
                ) : currentPage === 'Class' ? (
                    <>
                        <div>
                            <ClassCard 
                            setCharacterClass={setCharacterClass}
                            setCurrentPage={setCurrentPage} />
                        </div>
                    </>
                ) : currentPage === 'Abilities' ? (
                    <>
                        <div>
                            <AbilityCreator 
                                race={race}
                                strength={strength}
                                dexterity={dexterity}
                                constitution={constitution}
                                intelligence={intelligence}
                                wisdom={wisdom}
                                charisma={charisma}
                                setStrength={setStrength}
                                setDexterity={setDexterity}
                                setConstitution={setConstitution}
                                setIntelligence={setIntelligence}
                                setWisdom={setWisdom}
                                setCharisma={setCharisma}
                                aScoreSetStrength={aScoreSetStrength}
                                aScoreSetDexterity={aScoreSetDexterity}
                                aScoreSetCon={aScoreSetCon}
                                aScoreSetIntel={aScoreSetIntel}
                                aScoreSetWis={aScoreSetWis}
                                aScoreSetCharisma={aScoreSetCharisma}
                                aScoreStrength={aScoreStrength}
                                aScoreDexterity={aScoreDexterity}
                                aScoreCon={aScoreCon}
                                aScoreIntel={aScoreIntel}
                                aScoreWis={aScoreWis}
                                aScoreCharisma={aScoreCharisma}/>
                        </div>
                        </>
                ) : (
                    <h1>Something went wrong :(</h1>
                )}






                    {/* <button>Add Character</button> */}
                </form>
            </div>
        </div>
    )
}

export default CharCreation