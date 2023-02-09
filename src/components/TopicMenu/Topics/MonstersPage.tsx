import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import fetch from "../../../api/fetch"
import Monsters from "../../../model/Character/Monsters.interface"


function NextMonsterPage(URL: string | undefined) {

    const { data, status } = UseQueryMonsters()

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

function MonstersPage() {

    const { data, status } = UseQueryMonsters()

    const [ URL, setURL ] = useState('https://api.open5e.com/monsters/')

   

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
            {/* {NextMonsterPage(data?.next)} */}
        </div>

    </>
}

export default MonstersPage