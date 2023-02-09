import Races from "../model/Character/Races/races.interface";
import fetch from "./fetch";


class RacesData {
    fetchRaces(): Promise<Races> {
        return fetch('https://api.open5e.com/races/')
    }
}

export default RacesData