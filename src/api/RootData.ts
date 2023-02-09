import fetch from "./fetch"

class RootData {
    fetchRoot() {
        return fetch('https://api.open5e.com/')
    }
}

export default RootData