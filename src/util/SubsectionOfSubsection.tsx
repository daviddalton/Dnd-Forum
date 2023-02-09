import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionSummary, Typography } from "@mui/material"
import ClassPage from "../components/TopicMenu/Topics/ClassPage"
import { SubSection } from "../model/Character/SubSection.class"
import '../components/styles/sOfS.css'
import { Heading } from "../model/Character/Heading.class"

function SubSectionsWithSubSections(props: any) {
    return (
        <>
            {props.tempSection.subSections.map((subSec: SubSection) => (
                <div key={subSec.title} className="s-container">
                    <div className="s-title-desc-container">
                        <div className="s-title">
                               <h2>{subSec.title}</h2>
                        </div>
                        <div className="s-desc"
                            style={{
                                fontSize: props.width > 400 ? ('15px'): ('20px'),
                                flexDirection: "column"
                            }}
                            >
                                {subSec.desc.map((des: string) => (
                                    <div
                                        style={{
                                            padding: '10px'
                                        }}
                                        key={des}>
                                        {des}
                                    </div>
                                ))}
                        </div>
                        <SubSectionOfSubSections subSection={subSec} width={props.width}/>
                    </div>
                    
                </div>
            ))}
        </>    
    )
}

function SubSectionOfSubSections(props: any) {
    return (
        <div className="s-of-s-accordion-container">
            {props.subSection.subSections?.map((subSec: SubSection) => (
            <Accordion className="s-of-s-accordion"
                key={subSec.title}>
                <AccordionSummary className="s-of-s-accordionSummary"
                    expandIcon={<ExpandMore style={{ color: 'white' }}/>}
                    sx={{
                        background: 'rgb(118, 30, 33)',
                        color: "white"
                    }}>
                    <Typography style={{ fontFamily: 'buenard'}}>
                        {subSec.title}                    
                    </Typography>
                </AccordionSummary>
                <div className="s-of-s-accordion-desc"
                    style={{
                        fontSize: props.width > 400 ? ('15px'): ('20px')
                    }}>
                    {subSec.desc.map((des: string) => (
                        <div
                            style={{
                                padding: '10px'
                            }}
                            key={des}>
                                {des}
                        </div>
                    ))}
                    {subSec.table !== undefined && props.width > 650 ?  (
                        <div className="s-of-s-table-container">
                                <div className="s-of-s-table-title">
                                        {subSec.table.title}
                                </div>
                                <div className="s-of-s-heading-row">
                                        {subSec.table.headings.map((heading: Heading) => (
                                        <div className="s-of-s-column">
                                            <div className="s-of-s-table-heading-title"
                                                style={{
                                                    width: heading.title.includes('lasts') ? ('560px') : ('60px'),
                                                }}>
                                                    {heading.title}
                                            </div>
                                            {heading.data.map((dat: string) => (
                                                <div className="s-of-s-table-heading-data"
                                                    style={{

                                                    }}>
                                                        {dat}
                                                </div>
                                            ))}
                                        </div>
                                        ))}
                                </div>
                        </div>
                    ):(
                        <div></div>
                    )}

                </div>
            </Accordion>
            ))}
        </div>
    )
}

export default SubSectionsWithSubSections