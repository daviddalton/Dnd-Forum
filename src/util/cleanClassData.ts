import CharacterClass from "../model/Character/Character/CharacterClass.interface"
import { ChildTrait } from "../model/Character/ChildTrait"
import { ParentTrait } from "../model/Character/ParentTrait"

var targetTraitDirectory: ParentTrait
var targetChildDirectory: ChildTrait

export function cleanData(data: CharacterClass) {
    var cleanedData = data?.desc.replaceAll('×','x').replaceAll('*', '').split('\n')
    for (let i = 0; i < cleanedData!.length; i++ ) {
        if(cleanedData![i] === ' ') {
            cleanedData?.splice(i, 1)

        }
    }
    return cleanedData
}

export function createTraitDirectory(array: string[] | undefined, traitDirectory: ParentTrait[]) {
    for(let i = 0; i < array!.length; i++) {
        var compareString = array![i].substring(0,4)
        var descString = array![i]
        if(compareString === '### '){
            createTraitParent(i, descString, i, array, traitDirectory)
        }
        if (compareString === '####') {
            createTraitChild(i, descString, i, array)
        }
    }
}


function createTraitParent(id: number, descriptor: string, index: number, array: string[] | undefined, traitDirectory: ParentTrait[] ) {
    var name = descriptor.replaceAll('#', '').trim()
    traitDirectory.push(new ParentTrait(id, name, [], []))
    targetTraitDirectory = traitDirectory[traitDirectory.length - 1]
    for(let i = index + 1; i < array!.length; i++) {
        let substring = array![i]
        if(substring[0] !== "#") {
            targetTraitDirectory.desc.push(substring)
        } else {
            break
        }
    }
}

function createTraitChild(id: number, descriptor: string, index: number, array: string[] | undefined) {
    var name = descriptor.replaceAll('#', '').trim()
    targetTraitDirectory.childrenTraits.push(new ChildTrait(id, name, []))
    targetChildDirectory = targetTraitDirectory.childrenTraits[targetTraitDirectory.childrenTraits.length - 1]
    for (let i = index + 1; i < array!.length; i++) {
        let substring = array![i]
        if (substring[0] !== "#") {
            targetChildDirectory.desc.push(substring)
        } else {
            break
        }
    }
}