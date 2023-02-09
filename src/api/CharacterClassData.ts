import fetch from "./fetch";
import CharacterClass from "../model/Character/Character/CharacterClass.interface";
import CharacterClassesResponse from "../model/Character/Character/CharacterClassesResponse.interface";

class CharacterClassData {
    fetchClasses(): Promise<CharacterClassesResponse> {
        return fetch(`https://api.open5e.com/classes/`)
    }

    fetchClass(charClass: string): Promise<CharacterClass> {
        return fetch(`https://api.open5e.com/classes/` + charClass)
    }
}

export default CharacterClassData