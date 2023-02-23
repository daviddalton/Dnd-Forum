import { useQuery } from "@tanstack/react-query"
import fetch from "../../../api/fetch"
import Monsters from "../../../model/Character/Monsters.interface"


function MonstersPage() {

    const { data} = UseQueryMonsters()


    function FetchMonsters(): Promise<Monsters> {
        return fetch(URL)
    }
    function UseQueryMonsters() {
        return useQuery(['monsters'], () => FetchMonsters())
    }

    return<>
        <div className="wikiContent">
            <h1>Monster Page</h1>
            {data?.results.map(res => {
                return(
                <p>{res.name}</p>
                )
            })}

        </div>

    </>
}

export default MonstersPage