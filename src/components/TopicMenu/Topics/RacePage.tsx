import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import fetch from "../../../api/fetch"
import Race from "../../../model/Character/Races/race.interface"
import { SubSection } from "../../../model/Character/SubSection.class"
import { TopicSection } from "../../../model/Character/TopicSection.class"
import recursiveCleaning from "../../../util/recursiveCleaning"
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { Table } from "../../../model/Character/Table.class"
import { createData, createHeadings } from "../../../util/buildTable"
import SubsectionTable from "../../../util/SubsectionTable"
import '../../styles/racePage.css'




function RacesPage() {

    const { raceSlug } = useParams()
    const { data, status } = useQuery(['race', raceSlug], FetchRace)
    var tempSection = new TopicSection()

    function FetchRace(): Promise<Race> {
        return fetch(`https://api.open5e.com/races/${raceSlug}`)
    }
    function handleRace() {
        if (data !== undefined) {
            buildAstrickSubsection(tempSection, data.age)
            buildAstrickSubsection(tempSection, data.alignment)
            buildAstrickSubsection(tempSection, data.asi_desc)
            buildAstrickSubsection(tempSection, data.languages)
            buildAstrickSubsection(tempSection, data.size)
            buildAstrickSubsection(tempSection, data.speed_desc)
            buildAstrickSubsection(tempSection, data.vision)
            buildMultiAstrickSubsection(tempSection, data.traits, 'Traits')
            buildHashtagDesc(tempSection, data.desc)
        }

        
    }
    function buildAstrickSubsection(tempSection: TopicSection, data: string | undefined) {
        if (data !== '') {
            var tempSubsection = new SubSection()
            var tempData = data?.split('._**')
            tempSubsection.title = recursiveCleaning(tempData![0],['*','_'], '')
            tempSubsection.desc.push(tempData![1])
            tempSection.subSections.push(tempSubsection)
        }
    }
    function buildMultiAstrickSubsection(tempSection: TopicSection, data: string | undefined, title?: string) {
        var parentSubsection = new SubSection()
        var tempData = data?.split('**_')
        console.log(tempData)
        parentSubsection.title = title
        tempData?.forEach((s: string) => {
            if (s !== '') {
                var childSubsection = new SubSection()
                if (s.includes('._**')) {
                    var splitString = s.split('._**')
                    childSubsection.title = splitString[0]
                    childSubsection.desc.push(recursiveCleaning(splitString[1],['\n\n'],'').trim())
                } else {
                    var tempTable = new Table()
                    var tableData = s.split('\n\n')
                    tempTable.title = tableData[0].replaceAll('*','').trim()
                    var tableHeadingData = tableData[1].split('\n')
                    createHeadings(tableHeadingData[0].split('|'), tempTable)
                    createData(tableHeadingData, tempTable, 1)
                    childSubsection.table = tempTable
                    console.log(tempTable)
                }

                parentSubsection.subSections.push(childSubsection)
            }
        })
        tempSection.subSections.push(parentSubsection)
    }
    function buildHashtagDesc(tempSection: TopicSection, data: string | undefined) {
        var descData = data!.split('\n')
        tempSection.desc.push(descData[1])
    }

    handleRace()
    return(
        <div className="wiki-race-content-container">
                <RaceTitle data={data} />
                <RacePicture data={data} tempSection={tempSection} />
                <RaceSubsectionAccordion tempSection={tempSection} />
        </div>
    )
}

function RaceTitle(props: any) {
    return (
        <div className="race-page-title">
                <h1>{props.data?.name}</h1>
        </div>
    )
}

function RacePicture(props: any) {
    return (
        <div className="race-page-image-desc-container">
                <div className="race-page-image">
                        Image
                </div>
                <div className="race-page-image-desc">
                        {props.tempSection?.desc}
                </div>
        </div>
    )
}

function RaceSubsectionAccordion(props: any) {
    return (
        <div className="race-page-accordions-container">
            {props.tempSection.subSections.map((subSec: SubSection) => (
                <Accordion>
                    <AccordionSummary
                        style={{ background: 'rgb(118, 30, 33)', color: 'white', fontFamily: 'buenard'}}>
                        <Typography style={{ fontFamily: 'buenard'}}>
                            {subSec.title}
                        </Typography>
                    </AccordionSummary>
                        {subSec.subSections.length > 0 ? (
                            <div className="race-page-accordion-subsections">
                                <SubsectionOfAccordion subSec={subSec}/>
                            </div>
                        ):(
                        <div className="race-page-subsection-desc">
                            {subSec.desc}
                        </div>
                        )}
                </Accordion>
            ))}
        </div>
    )
}


function SubsectionOfAccordion(props: any) {
    return (
        <>
            {props.subSec.subSections.map((ss: SubSection) => (
                <div>
                    <div>
                        <h4 className="race-page-s-of-s-title">
                                {ss.title}
                        </h4>
                    </div>
                    <div className="race-page-s-of-s-desc">
                        {ss.desc}
                    </div>
                    {ss?.table !== undefined ? (
                        <div className="race-page-s-of-s-table">
                            <SubsectionTable subSection={ss}/>
                        </div>
                    ):(
                        <div></div>
                    )}
                </div>
            ))}
        </>
    )
}
export default RacesPage