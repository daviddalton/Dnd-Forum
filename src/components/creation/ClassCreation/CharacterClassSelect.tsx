import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import CharacterClassData from "../../../api/CharacterClassData"
import CharacterClass from "../../../model/Character/Character/CharacterClass.interface"
import { ParentTrait } from "../../../model/Character/ParentTrait"
import '../../styles/classCreate.css'
import CharacterClassModal from "./CharacterClassModal"
import SelectedClassPage from "./SelectedClassPage"
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'

const classesData = new CharacterClassData()

function CharacterClassSelect(props: any) {
    const {data} = useQuery(['classes'], classesData.fetchClasses)
    const [clicked, setClicked] = useState(false)
    const [classes, setClasses] = useState<CharacterClass[]>([])
    const [classTraits, setClassTraits] = useState<ParentTrait[]>([])

    const handleClose = () => { setClicked(false) }
    const handleClick = (characterClass: CharacterClass) => {
        props.setClassSlug(characterClass.slug)
        setClicked(true)
    }

    if (data?.results !== undefined) {
        if (data?.results.length > 0 && classes.length === 0) {
            setClasses(data.results)
        }
    }

    const handleSearch = (e: string) => {
        var index = classes?.filter((clazz: CharacterClass) => clazz.slug.includes(e) || clazz.name.includes(e))

        if (e.length === 0 && data?.results !== undefined) {
            console.log('works')
                setClasses(data.results)
        } else if (index !== undefined && e.length > 0) {
            setClasses(index)
        }
    }

    return (
        <>
        {props.characterClass === "" ? (
            <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="fade">
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
                     <CharacterClassModal 
                         clicked={clicked}
                         classSlug={props.classSlug}
                         setClicked={setClicked}
                         setClassTraits={setClassTraits}
                         setCharacterClass={props.setCharacterClass}
                         handleClose={handleClose}/>
             </div>
             </CSSTransition>
        ):(
            <SelectedClassPage 
                classTraits={classTraits}
                classSlug={props.classSlug} 
                setCharacterClass={props.setCharacterClass}/>
        )}
       
        </>
    )
}

export default CharacterClassSelect