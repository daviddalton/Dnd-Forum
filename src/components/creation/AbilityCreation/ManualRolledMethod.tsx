import { ExpandMore } from "@mui/icons-material";
import {  AccordionSummary, Typography } from "@mui/material"
import { useState } from "react";
import DiceRollMethod from "./DiceRollMethod";
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'
import '../../styles/manualRolled.css'
import { Accordion } from "../../../util/Constants";

function ManualRolledMethod(props: any) {
    return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
        <div>Manual Rolled Method</div>
        </CSSTransition>
    )
}

export default ManualRolledMethod