import { AppBar, Box, Card, Paper, Stack, styled } from "@mui/material";
import { display } from "@mui/system";
import { collection, doc, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore";
import { data } from "jquery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../../firebase-config";
import { CreatedChar } from "../../../model/Character/CreatedChar.interface"
import CreatedCharHeader from "./CreatedCharHeader";



function CreatedCharPage() {

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
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));



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
    {/* <div
        style={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '150px'
        }}>

        <Card
            style={{
                width: '1210px',
                height: '550px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#3A3A3A',
                borderRadius: '0px'
            }}>
            <div
                style={{
                    width: '484px',
                    height: '495px',
                    border: '1px red solid',
                    background: '#756C6C'
                }}>
                <p>Image</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px white solid',
                    width: '641px',
                    height: '495px'
                }}>
                    <div
                        style={{
                            border: '1px white solid',
                            width: '577px',
                            height: '74px',
                            marginTop: '25px',
                            color: 'white'
                        }}>
                        <p>Info:</p>
                    </div>
                    <div
                        style={{
                            border: '1px white solid',
                            width: '577px',
                            height: '74px',
                            marginTop: '25px',
                            color: "white"
                        }}>
                        <p></p>
                    </div>
                
                
            </div>

        </Card>
    </div> */}





    </>
}

export default CreatedCharPage;