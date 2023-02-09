import Speed from "./Speed";
import Subraces from "./subraces.interface";



class Race {
    clicked: boolean = false
    name?: string;
    slug?: string;
    desc?: string;
    asi_desc?: string;
    age?: string;
    alignment?: string;
    size?: string;
    speed?: Speed
    speed_desc?: string;
    languages?: string;
    vision?: string;
    traits?: string;
    subraces?: [Subraces]

}

export default Race