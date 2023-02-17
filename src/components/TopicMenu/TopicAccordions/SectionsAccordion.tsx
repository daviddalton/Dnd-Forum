import { AccordionSummary, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import SectionData from "../../../api/SectionData";

const sectionsData= new SectionData()

export default function CharacterAccordion() {

    const { data, status } = useQuery(['sections'], sectionsData.fetchSections)
    
    return<>
      <ul style={{
          color:'#E6E6E6'
        }}>
        {data?.results.map(res => {
          return(
            <AccordionSummary key={res.name}>
              <Typography sx={{
                 color:'#E6E6E6'
                }}>
                <Link 
                to={`wiki/sections/${res.slug}`}
                className="subFolder"
                >{res.name}</Link>
              </Typography>
            </AccordionSummary>
          )
        })}
      </ul>
    </>
}