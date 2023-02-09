import { ExpandMore } from "@mui/icons-material";
import {  AccordionSummary, Box, Modal, styled, Typography } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetch from "../../../api/fetch";
import Race from "../../../model/Character/Races/race.interface";
import { Link } from "react-router-dom"
import '../../styles/raceCreate.css'
import { removeData } from "jquery";
class Trait {
    name: string;
    clicked: boolean;
    handleClick(trait: Trait) {
        if (this.clicked) {
            this.clicked = false
        } else {
            this.clicked = true
            console.log('working')
        }
    }
    constructor(name: string, clicked: boolean) {
        this.name = name
        this.clicked = clicked
    }
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

function RaceModal(props: any) { 
    const {data , status} = useQuery(['races', props.raceSlug], FetchRace)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(props.clicked);
    const handleClose = () => {
        props.setClicked(false)
        
    }
    const [asiDesc, setAsiDesc] = useState(new Trait(
        'Ability Score Increase', false
    ))
    const [ageData, setAgeData] = useState(new Trait(
        'Age', false
    ))
    const [alignmentData, setAlignmentData] = useState(new Trait(
        'Alignment', false
    ))
    const [languagesData, setLanguages] = useState(new Trait(
        'Languages', false
    ))
    const [visionData, setVisionData] = useState(new Trait(
        'Vision', false
    ))
    const [traits, setTraits] = useState([asiDesc, ageData, alignmentData, languagesData, visionData])
    function FetchRace(): Promise<Race> {
        return fetch(`https://api.open5e.com/races/${props.raceSlug}`)
    }

    const handleAccordion = (trait: Trait)=> {
        
        trait.handleClick(trait)
        for (let t of traits) {
            if (t.name !== trait.name) {
                t.clicked = false
            }
        }
        setTraits([asiDesc, ageData, alignmentData, languagesData, visionData])
    }
  
    return (
      <div>
        <Modal
          open={props.clicked}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="race-modal-container">
                <div className="race-modal-header-container">
                    <div className="race-modal-header-confirm">
                        Confirm Race
                    </div>
                    <div className="race-modal-header-x">
                        <h1
                            onClick={handleClose}
                        >X</h1>
                    </div>
                </div>
                    <div className="race-modal-body-container">
                        <div className="race-modal-body-flexrow">
                            <div className="race-modal-body-flexcolumn">
                                <div className="race-modal-name">
                                    {data?.name}
                                </div>
                                <div className="race-modal-info">
                                    {data?.desc}
                                </div>
                                <div className="race-modal-racial-trait-title">
                                    Racial Traits:
                                </div>
                            </div>
                            <div className="race-modal-image">
                                    
                            </div>
                        </div>
                        <div className="race-modal-race-buttton-container">
                            <Link to={`/races/${props.raceSlug}`}>
                                <button className="race-modal-race-button">
                                    {data?.name} Details
                                </button>
                            </Link>
                        </div>
                                <Accordion 
                                    expanded={asiDesc.clicked}
                                    onChange={() => handleAccordion(asiDesc)}
                                    style={{
                                        marginLeft: '10px',
                                        marginTop: '10px',
                                        marginRight: '10px',
                                        background: '#3A3A3A',
                                        border: '1px #C7C7C7 solid'
                                    }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore style={{
                                            color: '#E6E6E6'
                                        }}/>}>
                                        <Typography
                                            style={{color: 'white'}}>
                                            {asiDesc.name}
                                        </Typography>
                                    </AccordionSummary>
                                    <div className="race-modal-accordion-text-container">
                                        <span className="race-modal-span-container">
                                            {data?.asi_desc}
                                        </span>
                                    </div>
                                </Accordion>
                                <Accordion 
                                    expanded={ageData.clicked}
                                    onChange={() => handleAccordion(ageData)}
                                    style={{
                                        marginLeft: '10px',
                                        marginTop: '10px',
                                        marginRight: '10px',
                                        background: '#3A3A3A',
                                        border: '1px #C7C7C7 solid'
                                    }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore style={{
                                            color: '#E6E6E6'
                                        }}/>}>
                                        <Typography
                                            style={{color: 'white'}}>
                                            {ageData.name}
                                        </Typography>
                                    </AccordionSummary>
                                    <div className="race-modal-accordion-text-container">
                                        <span className="race-modal-span-container">
                                            {data?.age}
                                        </span>
                                    </div>
                                </Accordion>
                                <Accordion 
                                    expanded={alignmentData.clicked}
                                    onChange={() => handleAccordion(alignmentData)}
                                    style={{
                                        marginLeft: '10px',
                                        marginTop: '10px',
                                        marginRight: '10px',
                                        background: '#3A3A3A',
                                        border: '1px #C7C7C7 solid'
                                    }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore style={{
                                            color: '#E6E6E6'
                                        }}/>}>
                                        <Typography
                                            style={{color: 'white'}}>
                                            {alignmentData.name}
                                        </Typography>
                                    </AccordionSummary>
                                    <div className="race-modal-accordion-text-container">
                                        <span className="race-modal-span-container">
                                            {data?.alignment}
                                        </span>
                                    </div>
                                </Accordion>
                                <Accordion 
                                    expanded={languagesData.clicked}
                                    onChange={() => handleAccordion(languagesData)}
                                    style={{
                                        marginLeft: '10px',
                                        marginTop: '10px',
                                        marginRight: '10px',
                                        background: '#3A3A3A',
                                        border: '1px #C7C7C7 solid'
                                    }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore style={{
                                            color: '#E6E6E6'
                                        }}/>}>
                                        <Typography
                                            style={{color: 'white'}}>
                                            {languagesData.name}
                                        </Typography>
                                    </AccordionSummary>
                                    <div className="race-modal-accordion-text-container">
                                        <span className="race-modal-span-container">
                                            {data?.languages}
                                        </span>
                                    </div>
                                </Accordion>
                                <Accordion 
                                    expanded={visionData.clicked}
                                    onChange={() => handleAccordion(visionData)}
                                    style={{
                                        marginLeft: '10px',
                                        marginTop: '10px',
                                        marginRight: '10px',
                                        background: '#3A3A3A',
                                        border: '1px #C7C7C7 solid'
                                    }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore style={{
                                            color: '#E6E6E6'
                                        }}/>}>
                                        <Typography
                                            style={{color: 'white'}}>
                                            {visionData.name}
                                        </Typography>
                                    </AccordionSummary>
                                    <div className="race-modal-accordion-text-container">
                                        <span className="race-modal-span-container">
                                            {data?.vision}
                                        </span>
                                    </div>
                                </Accordion>
                        <br />
                        <br />

                    </div>
                    <div className="race-modal-button-container">
                        <button 
                            className="race-modal-confirm-button"
                            onClick={() => props.setRace(data?.name)}>
                            Confirm
                        </button>
                    </div>
                </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default RaceModal