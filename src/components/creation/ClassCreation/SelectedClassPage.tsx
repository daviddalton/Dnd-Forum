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


class ClassTopic {
    title: string;
    desc: string;

    constructor(title: string, desc: string) {
        this.title = title
        this.desc = desc
    }
}

function SelectedClassPage(props: any) {

    const { data, status } = useQuery(['class', props.classSlug], FetchClass)
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
        <div
            style={{
                background: 'rgba(76,81,88,.6)',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                minWidth: '320px',
                maxWidth: '780px',
                fontFamily: 'buenard'
            }}>
                <SelectedClassHeader topics={topics} name={data!.name}/>
                <ClassSelectedButtons handleToClassPageClick={handleToClassPageClick} handleChangeClassClick={handleChangeClassClick}/>
                <ClassSelectTraits traitDirectory={traitDirectory}/>
        </div>
    )
}


function SelectedClassHeader(props: any) {
    return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '5px',
            height: 'fit-content'
        }}>
            <div
                style={{
                    marginTop: '5px',
                    marginLeft: '5px',
                    border: '1px white solid',
                    height: '140px',
                    width: '140px'
                }}>

            </div>
            <div>
                <div
                    style={{
                        margin: '5px',
                        width: '100%',
                        display: 'flex',
                        padding: '10px',
                        borderRadius: '10px',
                        opacity: '.6'
                    }}>
                        {props.name}
                </div>
                {props.topics.map((classTopic: ClassTopic) => (
                    <div
                        style={{
                            margin: '5px',
                            width: '100%',
                            display: 'flex',
                            padding: '10px',
                            borderRadius: '10px',
                            opacity: '.6'
                        }}>
                            {classTopic.title} {classTopic.desc}
                    </div>
                ))}
            </div>
    </div>
    )
}

function ClassSelectedButtons(props: any) {
    return (
        <div
            style={{
                margin: '5px',
                display: 'flex',
                justifyContent: "center"
            }}>
                <div
                    style={{
                        margin: '5px',
                        padding: '5px',
                        borderRadius: '10px',
                        background: '#761e21',
                        opacity: '.6',
                        cursor: 'pointer'
                    }}
                    onClick={props.handleToClassPageClick}>
                        To Class Page
                </div>
                <div
                    style={{
                        margin: '5px',
                        padding: '5px',
                        borderRadius: '10px',
                        background: '#761e21',
                        opacity: '.6',
                        cursor: 'pointer'
                    }}
                    onClick={props.handleChangeClassClick}>
                        Change Class
                </div>
        </div>
    )
}

function ClassSelectTraits(props: any) {
    return (
        <div
            style={{
                margin: '5px'
            }}>
                {props.traitDirectory.map((parentTrait: ParentTrait) => (
                    <Accordion 
                        key={parentTrait.id}
                        style={{
                            margin: '5px',
                            borderRadius: '10px',
                            opacity: '.6',
                            background: '#761e21'
                        }}>
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
                            <div
                                style={{
                                    padding: '10px',
                                    background: 'rgb(76, 81, 88)',
                                    color: 'white'
                                }}>
                                {str}
                            </div>
                        ))}
                    </Accordion>
                ))}

        </div>
    )
}
export default SelectedClassPage