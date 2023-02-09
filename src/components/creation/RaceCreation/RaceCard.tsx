import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RacesData from "../../../api/RacesData";
import Race from "../../../model/Character/Races/race.interface";
import RaceModal from "./RaceModal";
import '../../styles/raceCreate.css'
import { PropsFor } from "@mui/system";
import SelectedRacePage from "./SelectedRacePage";
import { Opacity } from "@mui/icons-material";

const racesData = new RacesData()

function RaceCard(props: any) {
    const [prop, setProp] = useState<string | undefined>()
    const [clicked, setClicked] = useState(false)
    const { data, status } = useQuery(['races'], racesData.fetchRaces)

    const handleClick = (race: Race) => {
        setProp(race.slug)
        setClicked(true)
    }

    
    const handleClose = () => {setClicked(false)};
    return (
       <div className="race-title-content-container">
                <div>
                        <h1
                            style={{
                                opacity: '.6'
                            }}>
                            Choose a Race
                        </h1>
                </div>
                <div style={{ border: '1px black solid', width: '50%', margin: '5px'}}></div>
                <div
                    style={{
                        margin: '5px',
                        width: '75%'
                    }}>
                        {data?.results.map((res: Race) => (
                            <IndvRace res={res} handleClick={handleClick}/>
                        ))}
                </div>
       </div>
    )
}

function IndvRace(props: any) {
    return (
        <div
            className="indv-race-container"
            onClick={props.handleClick(props.res.slug)}>
                <div className="indv-race-box">
                </div>
                <div className="indv-row-container">
                        <div className="indv-race-title">
                                {props.res.name}
                        </div>
                        <div className="indv-race-arrow">
                                {">"}
                        </div>
                </div>
    </div>
    )
}

export default RaceCard