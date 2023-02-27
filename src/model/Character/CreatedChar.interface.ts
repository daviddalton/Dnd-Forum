import { AbilityScore } from "./AbilityScore";

export interface CreatedChar {
    id?: string;
    uid?: string;
    img?: string;
    characterClass?: string;
    advancementType?: string;
    hitPointType?: string;
    createdBy?: string;
    characterName?: string;
    race?: string;
    background?: string;
    alignment?: string;
    level?: string;
    strength?: AbilityScore;
    dexterity?: AbilityScore;
    constitution?: AbilityScore;
    intelligence?: AbilityScore;
    wisdom?: AbilityScore;
    charisma?: AbilityScore
}

