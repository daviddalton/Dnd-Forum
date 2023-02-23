import CharacterClass from "../../../model/Character/Character/CharacterClass.interface"
import { Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {  AccordionSummary, Box, Modal } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import fetch from "../../../api/fetch";
import { Accordion, styleModal } from "../../../util/Constants";
import { ChildTrait } from "../../../model/Character/ChildTrait";
import { ParentTrait } from "../../../model/Character/ParentTrait";
import { cleanData, createTraitDirectory } from "../../../util/cleanClassData";

function CharacterClassModal(props: any) {

    const { data } = useQuery(['class', props.classSlug], FetchClass)
    const navigate = useNavigate()
    const handleClose = () => props.setClicked(false);

    const handleClassLinkClick = () => {
        navigate(`/wiki/classes/${data?.slug}`)
    }
    function FetchClass(): Promise<CharacterClass> {
        return fetch(`https://api.open5e.com/classes/${props.classSlug}`)
    }
    var traitDirectory:ParentTrait[] = []

    function handleConfirmClassClick() {
        props.setCharacterClass(data?.name)
        props.handleClose()
        props.setClassTraits(traitDirectory)
    }

    if (data?.desc !== undefined) {
        var splitData = cleanData(data)
        createTraitDirectory(splitData, traitDirectory)
        console.log(traitDirectory)
    }
    
    return(
        <div>
            <Modal
                open={props.clicked}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div className="class-modal-content-container">
                        <ClassTitle name={data?.name} handleClose={handleClose} />
                        <CreateClassDesc name={data?.name} />
                        <ClassButton name={data?.name} handleClassLinkClick={handleClassLinkClick}/>
                        <ClassModalTraits traitDirectory={traitDirectory} />
                        <ConfirmButton handleConfirmClassClick={handleConfirmClassClick} />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

function ClassTitle(props: any) {
    return (
        <div className="class-modal-title-container">
                <div className="class-modal-title-text">
                        <h2>{props.name}</h2>
                </div>
        </div>
    )
}

function CreateClassDesc(props: any) {
    return (
        <div className="class-modal-desc-container">
                Below is a list of traits specific to the {props.name} class. Click the link to learn more.
        </div>
    )
}

function ClassButton(props: any) {
    return (
        <div className="class-modal-class-link-container">
                <div className="class-modal-class-link"
                    onClick={props.handleClassLinkClick}>
                        {props.name} details page
                </div>
        </div>
    )
}

function ClassModalTraits(props: any) {
    return (
        <div className="class-modal-scrollable-container">
                {props.traitDirectory.map((parentTrait: ParentTrait) => (
                    <Accordion className="class-modal-indv-trait-accordion"
                        style={{
                            background: 'rgb(76, 81, 88)',
                            color: 'white',
                        }}>
                        <AccordionSummary
                            style={{
                                background: '#761e21',
                                borderRadius: '10px',
                            }}
                            expandIcon={<ExpandMore style={{ color: 'white' }}/>}>
                            <Typography>
                                {parentTrait.name}
                            </Typography>
                        </AccordionSummary>
                        
                                {parentTrait.desc.map((str: string) => (
                                    <>
                                    <div className="class-modal-indv-accordion-div">
                                        {str}
                                    </div>

                                    </>
                                ))}
                                {parentTrait.childrenTraits?.map((childTrait: ChildTrait) => (
                                    <div>
                                        <div style={{ padding: '5px' }}>
                                            <strong style={{ textDecoration: 'underline' }}>{childTrait.name}</strong>
                                        </div>
                                        <div>
                                            {childTrait.desc.map((str: string) => (
                                                <div style={{ padding: '5px 0px 5px 20px' }}>
                                                    {str}
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                ))}
                       
                    </Accordion>
                ))}
        </div>
    )
}

function ConfirmButton(props: any) {
    return (
        <div className="class-modal-confirm-button-container">
            <div className="class-modal-confirm-button"
                onClick={props.handleConfirmClassClick}>
                    Confirm
            </div>
        </div>

    )
}
export default CharacterClassModal