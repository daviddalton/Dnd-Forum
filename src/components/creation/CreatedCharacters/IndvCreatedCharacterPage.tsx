import { AppBar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../../firebase-config";
import { CreatedChar } from "../../../model/Character/CreatedChar.interface"
import CreatedCharHeader from "./IndvCreatedCharacterHeader";



function IndvCreatedCharacterPage() {

    const { id } = useParams()


    const getCharacter = doc(firestore, `characters/${id}`)
    const [character, setCharacter] = useState<CreatedChar>({});

    useEffect(() => {
        const fetchCharacterData = async () => {
            const docSnap = await getDoc(getCharacter)
            if(docSnap.exists()) {
                const newCreatedCharObj = {
                    id: docSnap.id,
                    ...docSnap.data()
                }
                setCharacter(newCreatedCharObj)
            } else {
                console.log('No character exists')
            }
        }
        fetchCharacterData()
    }, [getCharacter])



    return <> 
            <AppBar
                style={{
                    
                    marginTop: '90px',
                    background: '#3A3A3A',
                    height: '200px',
                    paddingTop: '5px'
                }}>
                    <CreatedCharHeader 
                        character={character}
                        characterName={character.characterName}
                        characterRace={character.race}
                        characterClass={character.characterClass}
                        characterLevel={character.level}
                        strength={character.aScoreStrength}
                        dexterity={character.aScoreDexterity}
                        constitution={character.aScoreCon}
                        intelligence={character.aScoreIntel}
                        wisdom={character.aScoreWis}
                        charisma={character.aScoreCharisma}/>
            </AppBar>
    </>
}

export default IndvCreatedCharacterPage