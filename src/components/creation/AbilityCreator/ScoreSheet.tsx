import { AbilityScoreCard } from "./abilityScoreCard"
import '../../styles/scoreSheet.css'


class score {
    name: string;
    value!: string | undefined;

    constructor(name: string) {
        this.name = name
    } 
}

function ScoreSheet(props: any) {

    return(
        <div className="score-sheet-abilities-container">
        {props.abilityScores.map((data: AbilityScoreCard) => (
        <div className="score-sheet-indv-ability-container">
            <div className="score-sheet-name-container">
                    {data.name}
            </div>
            {data.scores.map((score: score) => (
                <div className="score-sheet-indvScore-column-container">
                        <div className="score-sheet-indvScore-row-container">
                            <div className="indvScore-name">
                                {score.name}
                            </div>
                            <div className="indvScore-value">
                                {score.value}
                            </div>
                        </div>
                    <div className="indvScore-shadow">
                    </div>
                </div>
            ))}
            <div className="indvScore-other-scores-container">
                    <div className="indvScore-other-score-name">
                            Other Modifiers
                    </div>
                    <div className="indvScore-other-score-value">
                        --
                    </div>
            </div>
            <div className="indvScore-other-scores-container">
                    <div className="indvScore-other-score-name">
                            Override Score
                    </div>
                    <div className="indvScore-other-score-value">
                        --
                    </div>
            </div>
        </div>
        ))}
    </div>
    )
}

export default ScoreSheet