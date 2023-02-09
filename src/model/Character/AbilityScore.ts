export class AbilityScore {
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