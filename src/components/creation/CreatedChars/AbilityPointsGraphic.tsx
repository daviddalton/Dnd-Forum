




function AbilityPointsGraphic(props: any) {

    class AbilityScore {
        name!: string;
        total!: string;
        modifier!: string;

        findModifier() {
            var total = this.total
            var modifier: string
            switch(total) {
                case '8': modifier = '-1';
                    break;
                case '9': modifier = '-1';
                    break;
                case '10': modifier = '+0';
                    break;
                case '11': modifier = '+0';
                    break;
                case '12': modifier = '+1';
                    break;
                case '13': modifier = '+1';
                    break;
                case '14': modifier = '+2';
                    break;
                case '15': modifier = '+2';
                    break;
                case '16': modifier = '+3';
                    break;
                case '17': modifier = '+3'
                    break;
                default: modifier = '--'
            }
            return modifier!
        }
    }

    const strength = new AbilityScore()
        strength.name = 'Strength'
        strength.total = props.character.aScoreStrength
        strength.modifier = strength.findModifier()
    const dexterity = new AbilityScore()
        dexterity.name = "Dexterity"
        dexterity.total = props.character.aScoreDexterity
        dexterity.modifier = dexterity.findModifier()
    const constitution = new AbilityScore()
        constitution.name = "Constitution"
        constitution.total = props.character.aScoreCon
        constitution.modifier = constitution.findModifier()
    const intelligence = new AbilityScore()
        intelligence.name = "Intelligence"
        intelligence.total = props.character.aScoreIntel
        intelligence.modifier = intelligence.findModifier()
    const wisdom = new AbilityScore()
        wisdom.name = "Wisdom"
        wisdom.total = props.character.aScoreWis
        wisdom.modifier = wisdom.findModifier()
    const charisma = new AbilityScore()
        charisma.name = "Dexterity"
        charisma.total = props.character.aScoreCharisma
        charisma.modifier = charisma.findModifier()

    console.log(strength)
    const abilityScores = [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma
    ]
    return (

        <div
        style={{
            display: "flex",
            flexDirection: "row",
            border: "1px white solid",
            flexWrap: "wrap",
            height: "180px",
            width: "100%",
            margin: "5px"
        }}>
            {abilityScores.map((data: AbilityScore) => (
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                border: "1px white solid",
                width: "90px",
                height: "80px",
                marginTop: "5px",
                marginLeft: "5px"
            }}>
                <div
                    style={{
                        border: "1px white solid",
                        height: "20px",
                        width: "85px",
                        margin: "1px"
                    }}>
                        {data.name}
                </div>
                <div
                    style={{
                        border: "1px white solid",
                        height: "20px",
                        width: "85px",
                        margin: "1px"
                    }}>
                        {data.modifier}
                </div>
                <div
                    style={{
                        border: "1px white solid",
                        height: "20px",
                        width: "85px",
                        margin: "1px"
                    }}>
                        {data.total}
                </div>
            </div>
            ))}

        </div>

    )
}

export default AbilityPointsGraphic