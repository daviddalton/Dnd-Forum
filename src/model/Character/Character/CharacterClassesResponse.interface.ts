import CharacterClass from "./CharacterClass.interface";

interface CharacterClassesResponse {
    count: string;
    results: CharacterClass[];
}

export default CharacterClassesResponse;