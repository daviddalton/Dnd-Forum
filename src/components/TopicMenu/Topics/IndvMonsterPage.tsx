import { useParams } from "react-router-dom";
import Monster from "../../../model/Character/Monster";
import React, { useEffect, useState } from "react"
import axios from 'axios';


function IndvMonsterPage(props: any) {

    const { monsterSlug } = useParams()
    const [monsterData, setMonsterData] = useState<Monster>()

    React.useEffect(() => {
        axios.get(`https://api.open5e.com/monsters/${monsterSlug}`)
            .then(response => {
                setMonsterData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [monsterSlug])
    

    return (
        <div
            style={{
                marginTop: '20px',
                border: '1px white solid',
                width: '100%'
            }}>
                <div
                    style={{
                        border: '1px white solid',
                        margin: '5px'
                    }}>

                </div>
        </div>
    )
}

export default IndvMonsterPage


