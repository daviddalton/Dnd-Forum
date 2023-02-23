import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCharacter } from "../../controller";
import { useAuth } from "../../userContext";
import AbilityCreator from "../AbilityCreation/AbilityCreator";
import AppBarCreate from "./AppBarCreate";
import CharacterClassSelect from "../ClassCreation/CharacterClassSelect";
import CharacterRaceSelect from "../RaceCreation/CharacterRaceSelect";
import CharacterSettingsPage from "../SettingsCreation/CharacterSettingsPage";


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

function CharacterCreation() {
    const user = useAuth()
    const uid = user.user?.uid
    const [id, setId] = useState("")
    const [img, setImg] = useState("")
    const [level, setLevel] = useState("1")
    const [characterName, setCharacterName] = useState("")
    const [advancementType, setAdvancementType] = useState("Milestone")
    const [hitPointType, setHitPointType] = useState("Fixed")
    const [characterClass, setCharacterClass] = useState("")
    const [race, setRace] = useState("")
    const [raceSlug, setRaceSlug] = useState("")
    const [classSlug, setClassSlug] = useState("")
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
            id,
            uid,
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
        navigate('/create/character-select')
    }
    return (
        <div style={{
            color: 'white',
            width: '100%',
            background: '#222831',
            marginTop: '80px',
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            padding: '10px'
        }}>
            <div
                style={{
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
                    <CharacterSettingsPage
                        setCharacterName={setCharacterName} 
                        characterName={characterName}
                        setAdvancementType={setAdvancementType}
                        advancementType={advancementType}
                        setHitPointType={setHitPointType}
                        hitPointType={hitPointType}
                        setCurrentPage={setCurrentPage}
                    />
                ) : currentPage === 'Race' ? (
                    <>
                        <div>
                            <CharacterRaceSelect
                                race={race}
                                setRace={setRace}
                                raceSlug={raceSlug}
                                setRaceSlug={setRaceSlug}
                            />
                        </div>
                    </>
                ) : currentPage === 'Class' ? (
                    <>
                        <div>
                            <CharacterClassSelect
                            classSlug={classSlug}
                            setClassSlug={setClassSlug}
                            setCharacterClass={setCharacterClass}
                            characterClass={characterClass}
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






                    <button>Add Character</button>
                </form>
            </div>
        </div>
    )
}

export default CharacterCreation