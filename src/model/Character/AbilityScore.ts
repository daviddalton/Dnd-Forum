export class AbilityScore {
    scoreName: string;
    total: string

    constructor(scoreName: string, total: string) {
        this.scoreName = scoreName
        this.total = total
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