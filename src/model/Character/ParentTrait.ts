import { ChildTrait } from "./ChildTrait";

export class ParentTrait {
    id: number;
    name: string;
    desc: string[] = [];
    childrenTraits: ChildTrait[] = [];

    constructor(id: number, name: string, desc: string[], childrenTraits: ChildTrait[]) {
        this.id = id
        this.name = name
        this.desc = desc
        this.childrenTraits = childrenTraits
    }
}