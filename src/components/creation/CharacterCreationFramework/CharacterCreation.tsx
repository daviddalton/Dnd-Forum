import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCharacter } from "../../controller";
import { useAuth } from "../../userContext";
import AbilityCreator from "../AbilityCreation/AbilityScoreCreation";
import AppBarCreate from "./AppBarCreate";
import CharacterClassSelect from "../ClassCreation/CharacterClassSelect";
import CharacterRaceSelect from "../RaceCreation/CharacterRaceSelect";
import CharacterSettingsPage from "../SettingsCreation/CharacterSettingsPage";
import AbilityScoreCreation from "../AbilityCreation/AbilityScoreCreation";
import { AbilityScore } from "../../../model/Character/AbilityScore";



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
    const [strength, setStrength] = useState(new AbilityScore('STRENGTH', '--'))
    const [dexterity, setDexterity] = useState(new AbilityScore('DEXTERITY', '--'))
    const [constitution, setConstitution] = useState(new AbilityScore('CONSTITUTION', '--'))
    const [intelligence, setIntelligence] = useState(new AbilityScore('INTELLIGENCE', '--'))
    const [wisdom, setWisdom] = useState(new AbilityScore('WISDOM', '--'))
    const [charisma, setCharisma] = useState(new AbilityScore('CHARISMA', '--'))
    const navigate = useNavigate();

    const [scores, setScores] = useState(        [
        new score('--', false),
        new score('8', false),
        new score('10', false),
        new score('12', false),
        new score('13', false),
        new score('14', false),
        new score('15', false)
    ])
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
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma
            
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
                            <AbilityScoreCreation
                                race={race}
                                scores={scores}
                                setScores={setScores}
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
                                setCharisma={setCharisma}/>
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