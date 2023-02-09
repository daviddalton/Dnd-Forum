import { useQuery } from "@tanstack/react-query"
import SpellData from "../../../../api/SpellData"
import '../../../styles/spells.css'


const spellsData = new SpellData()

function Spellspage() {
    const { data, status } = useQuery(['spells'], () => spellsData.fetchSpells('Bard'))

    return<>
        <div>
            <h1>Spells</h1>
                <div className="SpellsContainer">
                    <h3 className="nameTag">Name</h3>
                    <h3 className="schoolTag">School</h3>
                    <h3 className="levelTag">Level</h3>
                    <h3 className="compTag">Component</h3>
                    <h3 className="classTag">Class</h3>
                {data?.results.map(res => {
                    return(
                        <><p className="name" key={res.name}>{res.name}</p>
                        <p className="school" key={res.school}>{res.school}</p>
                        <p className="level" key={res.level}>{res.level}</p>
                        <p className="comp" key={res.components}>{res.components}</p>
                        <p className="class" key={res.dnd_class}>{res.dnd_class}</p></>
                    )
                    })}
                </div>
        </div>
    </>
}

export default Spellspage