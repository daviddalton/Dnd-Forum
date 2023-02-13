import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RacesData from "../../../api/RacesData";
import Race from "../../../model/Character/Races/race.interface";
import RaceModal from "./RaceModal";
import '../../styles/raceCreate.css'
import SelectedRacePage from "./SelectedRacePage";

const racesData = new RacesData()

class RaceDesc {
    title!: string;
    desc: string[] = []
}
class AstrickTrait {
    title!: string;
    desc: string[] = []
}
class MultiAstrickTrait {
    astrickTraits: AstrickTrait[] = []
}

function RaceCard(props: any) {
    const [raceSlug, setRaceSlug] = useState<string | undefined>()
    const [clicked, setClicked] = useState(false)
    const { data, status } = useQuery(['races'], racesData.fetchRaces)
    const [raceData, setRaceData] = useState<AstrickTrait[]>([])
    const [raceDesc, setRaceDesc] = useState<RaceDesc>()

    const handleClick = (race: Race) => {
        setRaceSlug(race.slug)
        props.setRaceSlug(race.slug)
        setClicked(true)
    }

    
    const handleClose = () => {setClicked(false)};
   console.log(raceSlug)
    return (
        <>
        {props.race === "" ? (
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
       <RaceModal 
           raceSlug={raceSlug} 
           clicked={clicked} 
           setClicked={setClicked} 
           handleClose={handleClose}
           setRace={props.setRace}
           raceData={raceData}
           setRaceData={setRaceData}
           setRaceDesc={setRaceDesc}/>
</div>
        ):(
            <SelectedRacePage 
                raceData={raceData} 
                setRace={props.setRace}
                raceDesc={raceDesc}
                raceSlug={props.raceSlug}
                />
        )}
        

       </>
    )
}


export default RaceCard