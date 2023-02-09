import BackgroundClass from "../model/Character/Background/BackgroundClass"
import fetch from "./fetch"

class BackgroundData {
    fetchData(): Promise<BackgroundClass> {
        return fetch('https://api.open5e.com/backgrounds/')
    }
}

export default BackgroundData