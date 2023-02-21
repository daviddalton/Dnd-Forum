import { ExpandMore } from "@mui/icons-material";
import {  AccordionSummary, Box, Modal, styled, Typography } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetch from "../../../api/fetch";
import Race from "../../../model/Character/Races/race.interface";
import { Link } from "react-router-dom"
import '../../styles/raceCreate.css'
import React from "react";
import { Accordion, styleModal } from "../../../util/Constants";

class RaceDesc {
    title!: string;
    desc: string[] = []
}
class AstrickTrait {
    title!: string;
    desc: string[] = []
}
class MultiAstrickTrait {
    astrickTraits: AstrickTrait[] = []
}


function CharacterRaceModal(props: any) { 
    var raceDesc = new RaceDesc()
    var raceAlignment = new AstrickTrait()
    var raceAge = new AstrickTrait()
    var raceAsiDesc = new AstrickTrait()
    var raceLanguages = new AstrickTrait()
    var raceSize = new AstrickTrait()
    var raceSpeedDesc = new AstrickTrait()
    var raceTraits = new MultiAstrickTrait()
    var traits = [raceAlignment, raceAge, raceAsiDesc, raceLanguages, raceSize, raceSpeedDesc]

    const [width, setWidth] = useState(window.innerWidth)
    const {data , status} = useQuery(['races', props.raceSlug], FetchRace)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(props.clicked);
    const handleClose = () => {
        props.setClicked(false)
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    function handleResize() {
        setWidth(window.innerWidth)
    }
    function FetchRace(): Promise<Race> {
        return fetch(`https://api.open5e.com/races/${props.raceSlug}`)
    }
    function createAstrickTrait(traitDesc: string | undefined, raceTrait: AstrickTrait) {
        var splitDesc = traitDesc!.split('._**')
        raceTrait.title = splitDesc[0].replaceAll('**_','').trim()
        raceTrait.desc.push(splitDesc[1].trim())
        return raceTrait
    }
    function createRaceDesc(desc: string | undefined, raceDesc: RaceDesc) {
        var splitDesc = desc!.split('\n')
        raceDesc.title = splitDesc[0].replaceAll('#','').trim()
        raceDesc.desc.push(splitDesc[1].trim())
        return raceDesc
    }
    function handleMultiAstrickTraits(traitDesc: string | undefined, multiAstrickTrait: MultiAstrickTrait) {
        var splitDesc = traitDesc!.split('**_')
        splitDesc.forEach(element => {
            let tempAstrickTrait = new AstrickTrait()
            let tempArr = element.split('._**')
            if (tempArr[0] !== '') {
                tempAstrickTrait.title = tempArr[0].trim()
                tempAstrickTrait.desc.push(tempArr[1].trim())
                multiAstrickTrait.astrickTraits.push(tempAstrickTrait)
            }
        });
    }


   function buildRaceData(data: Race) {
    if (data !== undefined) {
        raceDesc = createRaceDesc(data.desc, raceDesc)
        raceAlignment = createAstrickTrait(data.alignment, raceAlignment)
        raceAge = createAstrickTrait(data.age, raceAge)
        raceAsiDesc = createAstrickTrait(data.asi_desc, raceAsiDesc)
        raceLanguages = createAstrickTrait(data.languages, raceLanguages)
        raceSize = createAstrickTrait(data.size, raceSize)
        raceSpeedDesc = createAstrickTrait(data.speed_desc, raceSpeedDesc)
        handleMultiAstrickTraits(data.traits, raceTraits)
        }
    }
    function handleSetRace() {
        props.setRace(data?.name)
        props.handleClose()
        props.setRaceData(traits)
        props.setRaceDesc(raceDesc)
    }
  
    if (data !== undefined && props.raceSlug !== undefined) {
        buildRaceData(data)
    }

    return (
      <div>
        <Modal
          open={props.clicked}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <div className="race-modal-content-container">
                    <RaceTitle name={data?.name} handleClose={handleClose} raceDesc={raceDesc} width={width}/>
                    <CreateRaceDesc raceDesc={raceDesc} />
                    <div className="race-modal-accordion-link-container">
                            <div className="race-modal-link-container">
                                    <Link 
                                        className="race-modal-link"
                                        to={`/wiki/races/${props.raceSlug}`}>
                                            {data?.name} Details Page
                                    </Link>
                            </div>
                            <div className="race-modal-accordion-container">
                                    <ShowTraits traits={traits} />
                                    <ShowRaceTrait raceTraits={raceTraits} />
                            </div>
                    </div>
                    <div className="race-modal-confirm-button-container">
                            <button 
                                className="race-modal-confirm-button"
                                onClick={handleSetRace}>
                                    Confirm
                            </button>
                    </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

  function RaceTitle(props: any) {
    return (
        <div className="race-modal-title-container">
            <div className="race-modal-text">
                    <h2>{props.name}</h2>
            </div>
    </div>
    )
  }

  export function ShowRaceTrait(props: any) {
    return (
        <Accordion className="race-selected-indv-trait-accordion"
            sx={{
                background: '#761e21'
            }}>
            <AccordionSummary 
                style={{
                    borderRadius: '10px',
                    color: 'white',
                }}
                expandIcon={<ExpandMore style={{ color: 'white'}}/>}>
                <Typography style={{ fontFamily: 'buenard' }}>
                    Race Traits
                </Typography>
            </AccordionSummary>
            <div
                style={{
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px'
                }}>
                {props.raceTraits?.astrickTraits.map((trait: AstrickTrait, index: number) => (
                    <div className="race-modal-race-traits-container">
                        <div className="race-modal-race-traits-title"
                            key={index}>
                            <div>{trait.title}</div>
                        </div>
                        <div className="race-modal-race-traits-desc">
                            {trait.desc}
                        </div>
                    </div>
                ))}
            </div>

        </Accordion>
    )
  }

  function ShowTraits(props: any) {
    return (
        <>
                    {props.traits.map((trait: AstrickTrait, index: number) => (
                        <>
                            <Accordion 
                                className="race-selected-indv-trait-accordion"
                                sx={{
                                    background: '#761e21'
                                }}
                                key={index}>
                                <AccordionSummary
                                    style={{
                                        borderRadius: '10px',
                                        color: 'white',
                                    }}>
                                    <Typography style={{fontFamily: 'buenard'}}>
                                        {trait.title}
                                    </Typography>
                                </AccordionSummary>
                                <div className="selected-race-accordion-summary-div">
                                        {trait.desc}
                                </div>
                            </Accordion>
                        </>
                    ))}
        </>
    )
  }

  function CreateRaceDesc(props: any) {
    return (
        <div className="race-modal-desc-container">
            {props.raceDesc?.desc.map((s: string, index: number) => (
                <div key={index}>
                    {s}
                </div>
            ))}
    </div>
    )
  }
export default CharacterRaceModal