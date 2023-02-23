import { SearchResults } from "./SearchResults.interface";

interface Search {
    count: number;
    next: string;
    previous: string | null;
    results: SearchResults[]
}

export default Search