


interface Monster {
    slug: string;
    name: string;
    size: string;
    type: string;
    subtype: string;
    alignment: string;
    armor_class: number;
    armor_desc: string;
    hit_points: number;
    hit_dice: string;
    speed: {
        swim: number;
        burrow: number;
        walk: number;
    }
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    perception: number;
    damage_vulnerabilities: string;
    damage_resistances: string;
    damage_immunities: string;
    condition_immunities: string;
    senses: string;
    languages: string;
    chanllenge_rating: string;
    actions: [
        {
            name: string;
            desc: string;
        },
        {
            name: string;
            desc: string;
            attack_bonus: string;
            damage_dice: string;
        }
    ]
    reactions: string;
    legendary_desc: string;
    special_abilities: [
        {
            name: string;
            desc: string;
        }
    ]
    spell_list: [];


}

export default Monster