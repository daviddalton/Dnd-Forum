import Pagination from "@mui/material/Pagination"
import React, { useEffect, useState } from "react"
import Monsters from "../../../model/Character/Monsters.interface"
import axios from 'axios';
import Monster from "../../../model/Character/Monster";
import { useWidth } from "../../WidthContext";
import '../../styles/monsters.css'

function MonstersPage() {
    const [page, setPage] = React.useState(1)
    const [monsterData, setMonsterData] = useState<Monsters>();
    const width = useWidth()

    useEffect(() => {
        axios.get(`https://api.open5e.com/monsters/?page=${page}`)
            .then(response => {
                setMonsterData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [page])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };
     
    return<>
        <div className="monster-page-container">
                <MonsterPagination handlePageChange={handlePageChange} />
                <MonsterTable monsterData={monsterData} width={width.width} />
        </div>
    </>
}

function MonsterPagination(props: any) {
    return (
        <div className="monster-pagination-container">
            <Pagination 
                count={30} 
                variant="outlined" 
                onChange={props.handlePageChange} 
                color={ 'primary'}
                sx={{button:{color: 'white', border: '1px white solid'}, ellipsis: {color: 'white'}}}/>
        </div>
    )
}

function MonsterTable(props: any) {
    return (
        <div className="monster-table-container">
                {props.width < 600 ? (
                <>
                    <MonsterName monsterData={props.monsterData}/>
                    <MonsterHitPoints monsterData={props.monsterData}/>
                </>
                ): props.width < 700 && props.width > 600 ? (
                <>
                    <MonsterName monsterData={props.monsterData}/>
                    <MonsterHitPoints monsterData={props.monsterData}/>
                    <MonsterType monsterData={props.monsterData}/>
                </>
                ): props.width > 700 ? (
                <>
                    <MonsterName monsterData={props.monsterData}/>
                    <MonsterHitPoints monsterData={props.monsterData}/>
                    <MonsterType monsterData={props.monsterData}/>
                    <MonsterSize monsterData={props.monsterData}/>
                </>
                ):(
                    <div>something</div>
                )}
        </div>
    )
}

function MonsterName(props: any) {
    return (
        <div className="monster-column-container">
            <div className="monster-title-container">
                    Name
            </div>
            {props.monsterData?.results.map((monster: Monster) => (
                <div className="monster-indv-data-container">
                    {monster.name}
                </div>
            ))}
        </div>
    )
}

function MonsterType(props: any) {
    return (
        <div className="monster-column-container">
            <div className="monster-title-container">
                    Type
            </div>
            {props.monsterData?.results.map((monster: Monster) => (
                <div className="monster-indv-data-container">
                    {monster.type}
                </div>
            ))}
    </div>
    )
}

function MonsterSize(props: any) {
    return (
    <div className="monster-column-container">
            <div className="monster-title-container">
                    Size
            </div>
            {props.monsterData?.results.map((monster: Monster) => (
                <div className="monster-indv-data-container">
                    {monster.size}
                </div>
            ))}
    </div>
    )
}

function MonsterHitPoints(props: any) {
    return (
        <div className="monster-column-container">
            <div className="monster-title-container">
                    HP
            </div>
            {props.monsterData?.results.map((monster: Monster) => (
                <div className="monster-indv-data-container">
                    {monster.hit_points}
                </div>
            ))}
    </div>
    )
}
export default MonstersPage