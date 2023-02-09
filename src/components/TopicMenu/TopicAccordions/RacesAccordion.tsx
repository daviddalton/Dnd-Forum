import { AccordionSummary, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import RacesData from "../../../api/RacesData"


const racesData = new RacesData()

function RacesAccordion() {

    const { data, status } = useQuery(['races'], racesData.fetchRaces)

    return<>
        <ul style={{
          color:'#E6E6E6'
        }}>
            {data?.results?.map(res => {
                return(
                    <AccordionSummary key={res.name}>
                    <Typography>
                      <Link to={`/races/${res.slug}`}
                        className="subFolder"
                      >{res.name}</Link>
                    </Typography>
                  </AccordionSummary>
                )
            })}
        </ul>
    </>
}

export default RacesAccordion