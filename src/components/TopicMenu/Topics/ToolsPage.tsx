import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionSummary, Typography } from "@mui/material"
import React from "react"
import { useState } from "react"
import { SubSection } from "../../../model/Character/SubSection.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import astrickSubSection from "../../../util/astrickSubSection"
import buildSectionDesc from "../../../util/buildSectionDesc"
import buildTable from "../../../util/buildTable"
import SectionTitleDesc from "../../../util/SectionTitleDesc"
import TopicSectionTable from "../../../util/TopicSectionTable"


function ToolsPage(props: any) {
    var tempSection = new TopicSection()

    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    function handleResize() {
        setWidth(window.innerWidth)
    }

    function handleTools(splitDesc: string[]) {
        buildSectionDesc(tempSection, splitDesc, '*', '')
        astrickSubSection(tempSection, splitDesc, '._**')
        buildTable(splitDesc, tempSection, 2)
    }

    handleTools(props.splitDesc)
    return (
        <div className="tools-content-container"
            style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                fontFamily: 'buenard'
            }}>
                <SectionTitleDesc name={props.name} tempSection={tempSection} />
                <div className="tools-accordion-table-container"
                    style={{ 
                        display: "flex",
                        justifyContent: 'center',
                        flexDirection: width > 800 ? ('row'):('column'),
                        alignItems: width < 800 ? 'center' : 'normal',
                        
                        }}>
                        <div className="tools-accordion-container"
                            style={{ width: width < 800 ? ('100%'):('400px') }}>
                            {tempSection.subSections.map((subSec: SubSection) => (
                                <Accordion
                                    style={{ opacity: '.6', marginTop: '5px'}}>
                                    <AccordionSummary
                                        style={{ background: 'rgb(118, 30, 33)', color: 'white'}}
                                        expandIcon={<ExpandMore style={{color: 'white'}}/>}>
                                        <Typography
                                            style={{ fontFamily: 'buenard'}}>
                                            {subSec.title}
                                        </Typography>
                                    </AccordionSummary>
                                        <div>
                                            {subSec.desc.map((s: string) => (
                                                <div
                                                    style={{
                                                        padding: '10px',
                                                        background: '#393E46',
                                                        color: 'white'
                                                    }}>
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                </Accordion>
                            ))}
                        </div>
                        <div
                            style={{
                                minWidth: '335px',
                                width: '100%',
                                maxWidth: '335px',
                            }}>
                            <TopicSectionTable tempSection={tempSection}/>
                        </div>

                </div>
                

        </div>
    )
}

export default ToolsPage