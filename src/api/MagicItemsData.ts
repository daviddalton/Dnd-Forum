import { MagicItems } from "../model/Character/MagicItems/MagicItem.interface";
import fetch from "./fetch";


export class MagicItemData {
    fetchPageOne(page: string | undefined): Promise<MagicItems> {
        return fetch(page)
    }
    fetchNextPage(nextPage: string | undefined): Promise<MagicItems> {
        return fetch(nextPage)
    }
    fetchPreviousPage(previousPage: string): Promise<MagicItems> {
        return fetch(previousPage)
    }
}