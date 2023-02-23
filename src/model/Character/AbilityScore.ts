export class AbilityScore {
    scoreName: string;
    total: string
    availableScores: Score[]

    constructor(scoreName: string, total: string, availableScores: Score[]) {
        this.scoreName = scoreName
        this.total = total
        this.availableScores = availableScores
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