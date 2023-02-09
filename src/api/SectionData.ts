import Section from "../model/Character/Sections"
import fetch from "./fetch";

class SectionData {
    fetchSections(): Promise<Section> {
        return fetch(`https://api.open5e.com/sections`)
    }
    fetchSection(slug: string): Promise<Section> {
        return fetch(`https://api.open5e.com/sections/${slug}`)
    }
}

export default SectionData