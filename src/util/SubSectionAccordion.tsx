import { SubSection } from "../model/Character/SubSection.class";
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import '../components/styles/subSectionAccordion.css'

function SubSectionAccordion(props: any) {
    return (
        <>
            {props.tempSection.subSections.map((subSec: SubSection) => (
                <Accordion className='subSection-accordion'>
                    <AccordionSummary className='subSection-accordionSummary'
                        style={{ background: 'rgb(118, 30, 33)', color: 'white', fontFamily: 'buenard'}}
                        expandIcon={<ExpandMore style={{ color: 'white'}}/>}>
                        <Typography style={{fontSize: 'larger', fontFamily: 'buenard'}}>
                            {subSec.title}
                        </Typography>
                    </AccordionSummary>
                    <div className='subSection-accordion-desc'>
                        {subSec.desc}
                    </div>
                </Accordion>
            ))}
        </>
    )
}

export default SubSectionAccordion