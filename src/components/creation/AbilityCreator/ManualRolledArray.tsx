import { ExpandMore } from "@mui/icons-material";
import {  AccordionSummary, styled, Typography } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { useState } from "react";
import DiceRollMethod from "./DiceRollMethod";
import '../../styles/manualRolled.css'


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

function ManualRolledArray() {
    const [entered, setEntered] = useState(false)
    const handleMouseEnter = (e: any) => {
        e.target.style.background = "#C7C7C7"
        e.target.style.color = "black"
        setEntered(true)
      }
      const handleMouseLeave = (e: any) => {
        setEntered(false)
        e.target.style.background = "#3A3A3A"
        e.target.style.color = "white"
      }

    const fakeData = [1, 1, 1, 1, 1, 1]
    return (
        <div className="manual-main-container">
                <div className="manual-score-entries-container">
                    <div className="manual-totalFiller-container">
                        <div className="manual-filler-div">

                        </div>
                        <div className="manual-total-container">
                                Total:
                        </div>
                    </div>
                {fakeData.map((data: number) => (
                <div className="indv-ability-score-container">
                    <div className="indv-name-container">
                            Ability name
                    </div>
                    <div className="indv-score-container">
                            --
                    </div>
                </div>
                ))}
                </div>
                <div className="dice-roll-add-group-container">
                        <Accordion className="dice-roll-accordion">
                            <AccordionSummary className="dice-roll-accordion-summary"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                expandIcon={<ExpandMore style={{color: entered ? 'black': '#C7C7C7'}}/>}>
                                <Typography>
                                    Dice Roll Groups
                                </Typography>
                            </AccordionSummary>
                            <div className="dice-roll-method-container">
                                <DiceRollMethod />
                            </div>
                        </Accordion>
                        <div className="add-group-button-container">
                                <button className="add-group-button">
                                        Add Group
                                </button>
                        </div>
                </div>  
        </div>
    )
}

export default ManualRolledArray