import { AccordionSummary, Typography, styled, Accordion } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import '../../styles/TopicsMenu.css'

class Topic {
    name!: string;
    subPath!: string;
    url!: string;
    slug!: string;
    subTopics!: Topic[]
    data!: any;
  }

function TopicAccordion(props: any) {
    const routing = useNavigate()
    const [open, setOpen] = useState(false)
    const [currentUrl, setCurrentUrl] = useState(``)
    
    function handleRouting(slug: string, parentName: string) {
        let sections = ['Characters', 'Equipment', 'Rules', 'Appendix', 'Spellcasting']
        if(sections.includes(parentName)) {
            routing(`wiki/sections/${slug}`)
        } else if (parentName === 'Classes') {
            routing(`wiki/classes/${slug}`)
        } else if (parentName === 'Races') {
            routing(`wiki/races/${slug}`)
        } else if (parentName === 'Spells') {
            routing(`wiki/spells/${slug}`)
        }
    }
    function handleTitleClick(topicName: string) {
        if (topicName === 'Magic Items') {
            routing('wiki/magicitems')
        }
    }

    const [expanded, setExpanded] = useState(true)
    return (
        <div>
        <Accordion 
            className="topic-accordion"
            sx={{borderRadius: '5px', background: 'none', boxShadow: '0px 2px 2px 0px black'}}
        >
            <AccordionSummary 
                className="topic-accordion-summary"
                sx={{ color: "white"}}
                expandIcon={<ExpandMore style={{ color: 'white' }}/>}
                onClick={() => handleTitleClick(props.topic.name)}>
                <Typography>
                    {props.topic.name}
                </Typography>
            </AccordionSummary>
            {props.topic.subTopics.map((sub: Topic) => (
                <div 
                    className="topic-accordion-subtopics"
                    onClick={() => handleRouting(sub.slug, props.topic.name)}
                    key={sub.slug}
                >
                    <p onClick={props.handleDrawerClose}>
                        {sub.name}
                    </p>
                </div>
            ))}
        </Accordion>
        </div>

    )
}

export default TopicAccordion