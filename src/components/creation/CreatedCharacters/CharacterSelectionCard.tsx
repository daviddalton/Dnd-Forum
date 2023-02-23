import { useNavigate } from "react-router-dom"
import { AbilityScore } from "../../../model/Character/AbilityScore";
import { CreatedChar } from "../../../model/Character/CreatedChar.interface"
import { scoreTitles } from "../../../util/Constants";
import { deleteCharacter } from "../../controller";
import '../../styles/characterSelect.css'
interface IProps {
    character: CreatedChar
}

function CharacterSelectionCard({character}: IProps) {

    var Ascores : AbilityScore[] = []

    const scoreTotals = [character.aScoreStrength, character.aScoreDexterity, character.aScoreCon, character.aScoreIntel, character.aScoreWis, character.aScoreCharisma];
    const navigate = useNavigate();
    const handleClickCharacter = (id: string | undefined) => {
        navigate(`/create/character-select/${id}`)
    }
    
    function createAScores() {
        for (let i = 0; i < scoreTitles.length; i++) {
            let abilityScore = new AbilityScore(scoreTitles[i], scoreTotals[i]!, [])
            Ascores.push(abilityScore)
        }
    }

    createAScores()

    return (
        <div className="character-select-indv-card-container"
            onClick={() => handleClickCharacter(character.id)}>
                <div className="character-select-indv-title-text">
                        {character.characterName} - Level: {character.level}
                </div>
                <div className="character-select-indv-info-container">
                        <div>
                            <div className="character-select-image-ability-scores-container">
                                    {Ascores.map((s: AbilityScore, index: number) => (
                                        <div key={index} className="character-select-indv-ability-scores">
                                                {s.scoreName}: {s.total}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="character-select-class-container">
                                Class: {character.characterClass}
                        </div>
                        <div className="character-select-race-continer">
                                Race: {character.race}
                        </div>
                        <div className="character-select-delete-container">
                                <div className="character-select-delete-button"
                                    onClick={() => deleteCharacter(character.id, navigate)}>
                                        Delete
                                </div>
                        </div>
                </div>
        </div>
    )
}

export default CharacterSelectionCard