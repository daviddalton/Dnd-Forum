

class score {
    name: string;
    value!: string;

    constructor(name: string) {
        this.name = name
    } 
}

export class AbilityScoreCard {
    name!: string;
    total!: string | undefined;
    scores = [
        new score('Total Score'),
        new score('Modifier'),
        new score('Base Score'),
        new score('Racial Bonus'),
        new score('Ability Improvements'),
        new score('Misc Bonus'),
        new score('Set Score')
    ]

     findTotal(currentRaceBonus: string = this.scores[3].value, currentBaseScore: string = this.scores[2].value, currentSymbol: string = this.scores[3].value[0]) {
        if (currentBaseScore !== '--') {
            var total: number
            var stringTotal: string;
            let raceBonus = parseInt(currentRaceBonus)
            let baseScore = parseInt(currentBaseScore)
            total = baseScore + raceBonus
            stringTotal = total.toString()
            return stringTotal
        } else {
            return '--'
        }
    }

    findModifier() {
        var total = this.scores[0].value
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
            default: modifier = '+0'
        }
        return modifier!
    }
    findRacialBones(raceProp: string) {
        var name = this.name
        var race = raceProp
        var racialBonus!: string
        switch(name) {
            case 'Strength':
                switch(race) {
                    case 'Human':
                        racialBonus = '+1'
                        break;
                    case 'Dragonborn':
                        racialBonus = '+2'
                        break;
                    case 'Half-Orc':
                        racialBonus = '+2'
                        break
                    default: racialBonus = '+0'
                }
                break
            case 'Dexterity':
                switch(race) {
                    case 'Elf':
                        racialBonus = '+2'
                        break;
                    case 'Halfling':
                        racialBonus = '+2'
                        break;
                    case 'Human':
                        racialBonus = '+1'
                        break;
                    default: racialBonus = '+0'
                }
                break
            case 'Constitution':
                switch(race) {
                    case 'Dwarf':
                        racialBonus = '+2'
                        break;
                    case 'Half-Orc':
                        racialBonus = '+1'
                        break;
                    case 'Human':
                        racialBonus = '+1'
                        break;
                    default: racialBonus = '+0'
                }
                break
            case 'Intelligence':
                switch(race) {
                    case 'Human':
                        racialBonus = '+1'
                        break;
                    case 'Gnome':
                        racialBonus = '+2'
                        break;
                    case 'Tiefling':
                        racialBonus = '+1'
                        break;
                    default: racialBonus = '+0'
                }
                break
            case 'Wisdom':
                switch(race) {
                    case 'Human':
                        racialBonus = '+1'
                        break;
                    default: racialBonus = '+0'
                }
                break
            case 'Charisma':
                switch(race) {
                    case 'Human':
                        racialBonus = '+1'
                        break;
                    case 'Dragonborn':
                        racialBonus = '+1'
                        break;
                    case 'Half-Elf':
                        racialBonus = '+2'
                        break;
                    case 'Tiefling':
                        racialBonus = '+2'
                        break;
                    default: racialBonus = '+0'
                }
                break
            default: racialBonus = '+0'  
        }
        return racialBonus
        
    }
}