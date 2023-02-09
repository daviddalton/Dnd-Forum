import {useEffect, useState} from 'react';
import {DocumentData, onSnapshot, QuerySnapshot} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { characterCollection } from '../../controller';
import { CreatedChar } from '../../../model/Character/CreatedChar.interface';
import CharacterCard from '../CharacterCard';
import { AbilityScore } from '../../../model/Character/AbilityScore';
import '../../styles/characterSelect.css'
import '../../styles/characterCard.css'
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';


function CharacterSelection() {

    const [characters, setCharacters] = useState<CreatedChar[]>([])
    const auth = getAuth()
    const scoreTitles = ['Str', 'Dex', 'Con', 'Intl', 'Wis', 'Cha'];

    var Ascores : AbilityScore[] = []
    function createAScores() {
        for (let i = 0; i < scoreTitles.length; i++) {
            let abilityScore = new AbilityScore(scoreTitles[i], '--', [])
            Ascores.push(abilityScore)
        }
    }
    createAScores()
    
    useEffect(
        () => onSnapshot(characterCollection, (snapshot: QuerySnapshot<DocumentData>) => {
            setCharacters(       
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        }), 
      []
    );
        
    const navigate = useNavigate();
    const handleClickNewCharacter = () => {
        navigate(`/create/character-select/new-character/character-creator`)
    }
   console.log(auth.currentUser)
    return (
        <div className='character-select-screen-container'>
                <div className='character-select-content-container'>
                        <div className='character-cards-container'>
                                <div className='character-select-indv-card-container'
                                    onClick={handleClickNewCharacter}>
                                        <div className='character-select-indv-title-text'>
                                                New Character
                                        </div>
                                        <div className='character-select-indv-info-container'>
                                                <div>
                                                        <div className='character-select-image-ability-scores-container'>
                                                                {Ascores.map((s: AbilityScore) => (
                                                                    <div className='character-select-indv-ability-scores'>
                                                                            {s.scoreName}: {s.total}
                                                                    </div>
                                                                ))}
                                                        </div>
                                                </div>
                                                <div className='character-select-class-container'>
                                                        Class:
                                                </div>
                                                <div className='character-select-race-continer'>
                                                        Race: 
                                                </div>
                                                <div className='character-select-delete-container'>
                                                        <div className='character-select-delete-button'>
                                                        </div>
                                                </div>
                                        </div>
                                </div>    
                                {characters.map((character: CreatedChar) => (
                                    <CharacterCard character={character}/>
                                ))}
                        </div>
                </div>
        </div>
    )
}

export default CharacterSelection;