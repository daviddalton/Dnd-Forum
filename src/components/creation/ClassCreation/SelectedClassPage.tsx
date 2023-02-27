import { ExpandMore } from "@mui/icons-material";
import { AccordionSummary, Typography } from "@mui/material";
import CharacterClass from "../../../model/Character/Character/CharacterClass.interface";
import { ParentTrait } from "../../../model/Character/ParentTrait";
import { Accordion } from "../../../util/Constants";
import fetch from "../../../api/fetch";
import { useQuery } from "@tanstack/react-query";
import { ChildTrait } from "../../../model/Character/ChildTrait";
import { cleanData, createTraitDirectory } from "../../../util/cleanClassData";
import { useNavigate } from "react-router-dom";
import '../../styles/selectedClass.css'
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'


class ClassTopic {
    title: string;
    desc: string;

    constructor(title: string, desc: string) {
        this.title = title
        this.desc = desc
    }
}

function SelectedClassPage(props: any) {

    const { data } = useQuery(['class', props.classSlug], FetchClass)
    const navigate = useNavigate()
    function FetchClass(): Promise<CharacterClass> {
        return fetch(`https://api.open5e.com/classes/${props.classSlug}`)
    }

    const hitDice = new ClassTopic('Hit Dice:', data!.hit_dice)
    const levelOneHp = new ClassTopic('1st Level HP:', data!.hp_at_1st_level)
    const higherLevelHp = new ClassTopic('HP after Level 1:', data!.hp_at_higher_levels)
    const profArmor = new ClassTopic('Armor Proficiency:', data!.prof_armor)
    const topics = [hitDice, levelOneHp, higherLevelHp, profArmor]

    var traitDirectory:ParentTrait[] = []
    var targetTraitDirectory: ParentTrait
    var targetChildDirectory: ChildTrait

    function handleToClassPageClick() {
        navigate(`/wiki/classes/${data?.slug}`)
    }

    function handleChangeClassClick() {
        props.setCharacterClass("")
    }
    if (data?.desc !== undefined) {
        var splitData = cleanData(data)
        createTraitDirectory(splitData, traitDirectory, targetTraitDirectory!, targetChildDirectory!)
    }
    return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
        <div className="selected-class-container">
                <SelectedClassHeader topics={topics} name={data!.name}/>
                <ClassSelectedButtons handleToClassPageClick={handleToClassPageClick} handleChangeClassClick={handleChangeClassClick}/>
                <ClassSelectTraits traitDirectory={traitDirectory}/>
        </div>
        </CSSTransition>
    )
}


function SelectedClassHeader(props: any) {
    return (

    <div className="selected-class-header-container">
            <div className="selected-class-image"/>
            <div>
                <div className="selected-class-name">
                        {props.name}
                </div>
                {props.topics.map((classTopic: ClassTopic) => (
                    <div className="selected-class-indv-topic">
                            {classTopic.title} {classTopic.desc}
                    </div>
                ))}
            </div>
    </div>

    )
}

function ClassSelectedButtons(props: any) {
    return (
        <div className="selected-class-button-container">
                <div className="selected-class-button"
                    onClick={props.handleToClassPageClick}>
                        To Class Page
                </div>
                <div className="selected-class-button"
                    onClick={props.handleChangeClassClick}>
                        Change Class
                </div>
        </div>
    )
}

function ClassSelectTraits(props: any) {
    return (
        <div className="selected-class-traits-container">
                {props.traitDirectory.map((parentTrait: ParentTrait) => (
                    <Accordion className="selected-class-indv-trait-accordion"
                        key={parentTrait.id}
                        style={{ background: '#761e21' }}>
                        <AccordionSummary
                            style={{
                                borderRadius: '10px',
                                color: 'white',
                            }}
                            expandIcon={<ExpandMore style={{ color: 'white'}} />}>
                            <Typography>
                                {parentTrait.name}
                            </Typography>
                        </AccordionSummary>
                        {parentTrait.desc.map((str: string) => (
                            <div className="selected-class-indv-div">
                                {str}
                            </div>
                        ))}
                    </Accordion>
                ))}

        </div>
    )
}
export default SelectedClassPage