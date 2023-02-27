import {  AccordionSummary, styled, Typography } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { useQuery } from "@tanstack/react-query";
import Race from "../../../model/Character/Races/race.interface";
import '../../styles/selectedRace.css'
import fetch from "../../../api/fetch";
import { ShowRaceTrait } from "./CharacterRaceModal";
import { ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'

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

function SelectedRacePage(props: any) {
    var raceDesc = new RaceDesc()
    var raceAlignment = new AstrickTrait()
    var raceAge = new AstrickTrait()
    var raceAsiDesc = new AstrickTrait()
    var raceLanguages = new AstrickTrait()
    var raceSize = new AstrickTrait()
    var raceSpeedDesc = new AstrickTrait()
    var raceTraits = new MultiAstrickTrait()
    var traits = [raceAlignment, raceAge, raceAsiDesc, raceLanguages, raceSize, raceSpeedDesc]
    
    const {data} = useQuery(['races', props.raceSlug], FetchRace)
    const navigate = useNavigate()

    const handleToRaceClick = () => {
        navigate(`/wiki/races/${props.raceSlug}`)
    }
    function handleChangeRace() {
        props.setRace("")
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
    if (data !== undefined && props.raceSlug !== undefined) {
        buildRaceData(data)
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
    return(
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
        <div className="selected-race-container">
            <div className="selected-race-image-desc-container">
                    <div className="selected-race-image">
                            image
                    </div>
                    <div>
                        <div className="selected-race-desc">
                           <p>You've chosen the race: <strong>{data?.name}</strong></p>
                        </div>
                        <div className="selected-race-desc">
                                {raceDesc.desc}
                        </div>
                    </div>

            </div>
            <div className="selected-race-button-container">
                            <button 
                                className="selected-race-button"
                                onClick={handleToRaceClick}>
                                    To Race
                            </button>
                            <button className="selected-race-button"
                                onClick={handleChangeRace}>
                                    Change Race
                            </button>
            </div>
            <div className="selected-race-accordion-container">

                    {traits.map((trait: AstrickTrait, index: number) => (
                        <>
                            <Accordion 
                                className="race-selected-indv-trait-accordion"
                                sx={{
                                    background: '#761e21'
                                }}
                                key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore style={{ color: 'white'}} />}
                                    style={{
                                        borderRadius: '10px',
                                        color: 'white',
                                        
                                    }}>
                                    <Typography style={{ fontFamily: 'buenard'}}>
                                        {trait.title}
                                    </Typography>
                                </AccordionSummary>
                                <div className="selected-race-accordion-summary-div">
                                        {trait.desc}
                                </div>
                            </Accordion>
                        </>
                    ))}
                    <ShowRaceTrait raceTraits={raceTraits}/>

            </div>
        </div>
        </CSSTransition>
    )
}

export default SelectedRacePage