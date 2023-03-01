export class AbilityScore {
    scoreName: string;
    total: string
    modifier!: string
    availableScores: Score[]

    constructor(scoreName: string, total: string, availableScores: Score[]) {
        this.scoreName = scoreName
        this.total = total
        this.availableScores = availableScores
    }
    findModifier() {
        var total = this.total
        var modifier: string
        switch(total) {
            case '6': modifier = '-2';
                break;
            case '7': modifier = '-2';
                break;
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
            case '17': modifier = '+3';
                break;
            case '18': modifier = '+4';
                break;
            case '19': modifier = '+4';
                break;
            case '20': modifier = '+5';
                break;
            case '21': modifier = '+5';
                break;
            default: modifier = '+0'
        }
        return modifier!
    }
}
export class Score {
    value: string;
    disabled: boolean

    constructor(value: string, disabled: boolean) {
        this.value = value
        this.disabled = disabled
    }
}