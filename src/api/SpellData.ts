import Spell from "../model/Character/Spells/spell"
import Spells from "../model/Character/Spells/Spells"
import fetch from "./fetch"



class SpellData {
    fetchSpells(url: string): Promise<Spells> {
        return fetch(url)
    }

    fetchSpell(spell: string): Promise<Spell> {
        return fetch('https://api.open5e.com/spells/' + spell)
    }
}

export default SpellData