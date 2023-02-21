import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import CharacterClassData from "../../../api/CharacterClassData"
import CharacterClass from "../../../model/Character/Character/CharacterClass.interface"
import '../../styles/classCreate.css'
import ClassModal from "./CharacterClassModal"

const classesData = new CharacterClassData()

function CharacterClassSelect(props: any) {
    const {data, status} = useQuery(['classes'], classesData.fetchClasses)

    const [prop, setProp] = useState<string | undefined>()
    const [search, setSearch] = useState("")
    const [clicked, setClicked] = useState(false)
    const [classes, setClasses] = useState<CharacterClass[]>([])

    const handleClose = () => { setClicked(false) }
    const handleClick = (characterClass: CharacterClass) => {
        setProp(characterClass.slug)
        setClicked(true)
        props.setCharacterClass(characterClass.name)
    }

    if (data?.results !== undefined) {
        if (data?.results.length > 0 && classes.length === 0) {
            setClasses(data.results)
        }
    }

    const handleSearch = (e: string) => {
        var index = classes?.filter((clazz: CharacterClass) => clazz.slug.includes(e) || clazz.name.includes(e))
        setSearch(e)
        if (e.length === 0 && data?.results !== undefined) {
            console.log('works')
                setClasses(data.results)
        } else if (index !== undefined && e.length > 0) {
            setClasses(index)
        }
    }

    return (
        <div
            className="classCard-container">
                <div className="classCard-title-text">
                    <h1>Choose a Class</h1>
                </div>
                <div style={{ borderTop: '1px black solid', width: '50%', margin: '5px'}}/>
                <div className="class-search-bar-container">
                        <input
                            className="class-search-input"
                            type="text"
                            onChange={(e) => handleSearch(e.target.value as string)}
                            placeholder={"Search:"}
                            autoCapitalize='true'
                            autoCorrect="true">
                        </input>
                </div>
                <div className="classCard-classes-container">
                    {classes?.map((res) => (
                        <div 
                            key={res.slug}
                            className="individual-class-container"
                            onClick={() => handleClick(res)}>
                            <div className="class-image-container">
                            </div>
                            <div className="class-content-container">
                                <div className="class-text-container">
                                    <p style={{ marginLeft: '10px'}}>
                                        {res.name}
                                    </p>
                                </div>
                                <div className="class-arrow-container">
                                    
                                        {">"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="create-nav-save-container">
                        <div 
                            className="create-nav-save-left-arrow"
                            onClick={() => props.setCurrentPage('Race')}>
                        </div>
                        <div className="create-nav-save-button-container">
                            <button className="create-nav-save-button">
                                Save
                            </button>
                        </div>
                        <div className="create-nav-save-right-arrow"
                            onClick={() => props.setCurrentPage('Abilities')}>
                        </div>
                    </div>
                    <ClassModal 
                        clicked={clicked}
                        classSlug={prop}
                        setClicked={setClicked}/>
        </div>
    )
}

export default CharacterClassSelect