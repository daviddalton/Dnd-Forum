import { MagicItem } from "./MagicItems.interface";



export interface MagicItems {
    count: number;
    next: string;
    previous: string | null;
    results: MagicItem[];
    range: string

}