import Pagination from "@mui/material/Pagination"
import React, { useEffect, useState } from "react"
import Monsters from "../../../model/Character/Monsters.interface"
import axios from 'axios';
import Monster from "../../../model/Character/Monster";
import { useWidth } from "../../WidthContext";
import '../../styles/monsters.css';
import { useNavigate } from "react-router-dom"

function MonstersPage() {
    const [page, setPage] = React.useState(1)
    const [monsterData, setMonsterData] = useState<Monsters>();
    const navigate = useNavigate()
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

    const handleMonsterLinkClick = (monsterSlug: string) => {
        navigate(`/wiki/monsters/${monsterSlug}`)
    }
     
    return<>
        <div className="monster-page-container">
                <MonsterPagination handlePageChange={handlePageChange} />
                <MonsterTable monsterData={monsterData} width={width.width} handleMonsterLinkClick={handleMonsterLinkClick}/>
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
                    <MonsterName monsterData={props.monsterData} handleMonsterLinkClick={props.handleMonsterLinkClick}/>
                    <MonsterHitPoints monsterData={props.monsterData}/>
                </>
                ): props.width < 700 && props.width > 600 ? (
                <>
                    <MonsterName monsterData={props.monsterData} handleMonsterLinkClick={props.handleMonsterLinkClick}/>
                    <MonsterHitPoints monsterData={props.monsterData}/>
                    <MonsterType monsterData={props.monsterData}/>
                </>
                ): props.width > 700 ? (
                <>
                    <MonsterName monsterData={props.monsterData} handleMonsterLinkClick={props.handleMonsterLinkClick}/>
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
                <div 
                    className="monster-indv-data-container"
                    onClick={() => props.handleMonsterLinkClick(monster.slug)}>
                     {monster.name}
                </div>
            ))}
        </div>
    )
}

function MonsterType(props: any) {
    return (
        <div className="monster-column-other-container">
            <div className="monster-title-other-container">
                    Type
            </div>
            {props.monsterData?.results.map((monster: Monster) => (
                <div className="monster-indv-data-other-container">
                    {monster.type}
                </div>
            ))}
    </div>
    )
}

function MonsterSize(props: any) {
    return (
    <div className="monster-column-other-container">
            <div className="monster-title-other-container">
                    Size
            </div>
            {props.monsterData?.results.map((monster: Monster) => (
                <div className="monster-indv-data-other-container">
                    {monster.size}
                </div>
            ))}
    </div>
    )
}

function MonsterHitPoints(props: any) {
    return (
        <div className="monster-column-other-container">
            <div className="monster-title-other-container">
                    HP
            </div>
            {props.monsterData?.results.map((monster: Monster) => (
                <div className="monster-indv-data-other-container">
                    {monster.hit_points}
                </div>
            ))}
    </div>
    )
}
export default MonstersPage