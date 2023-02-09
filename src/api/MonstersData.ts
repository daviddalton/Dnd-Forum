import Monsters from "../model/Character/Monsters.interface";
import fetch from "./fetch";



class MonstersData {
    fetchMonsters(): Promise<Monsters> {
        return fetch('https://api.open5e.com/monsters/')
    }
}

export default MonstersData