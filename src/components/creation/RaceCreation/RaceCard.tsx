import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RacesData from "../../../api/RacesData";
import Race from "../../../model/Character/Races/race.interface";
import RaceModal from "./RaceModal";
import '../../styles/raceCreate.css'

const racesData = new RacesData()

function RaceCard(props: any) {
    const [raceSlug, setRaceSlug] = useState<string | undefined>()
    const [clicked, setClicked] = useState(false)
    const { data, status } = useQuery(['races'], racesData.fetchRaces)

    const handleClick = (race: Race) => {
        console.log(race)
        setRaceSlug(race.slug)
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
                        {data?.results.map((res: Race, index: number) => (
                            <div key={index}
                                className="indv-race-container"
                                onClick={() => handleClick(res)}>
                                    <div className="indv-race-box">
                                    </div>
                                    <div className="indv-row-container">
                                            <div className="indv-race-title">
                                                    {res.name}
                                            </div>
                                            <div className="indv-race-arrow">
                                                    {">"}
                                            </div>
                                    </div>
                            </div>
                        ))}
                </div>
                <RaceModal raceSlug={raceSlug} clicked={clicked} setClicked={setClicked} handleClose={handleClose}/>
       </div>
    )
}


export default RaceCard