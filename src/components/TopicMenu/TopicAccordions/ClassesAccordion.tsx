import { AccordionSummary, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import CharacterClassData from "../../../api/CharacterClassData"


const classData =  new CharacterClassData()

function ClassesAccordion() {

    const { data, status } = useQuery(['classes'], classData.fetchClasses)

    return<>
        <ul style={{
          color:'#E6E6E6'
        }}>
            {data?.results.map(clazz => {
                return(
                    <AccordionSummary key={clazz.name}>
                    <Typography>
                      <Link to={`/classes/${clazz.slug}`}
                      >{clazz.name}</Link>
                    </Typography>
                  </AccordionSummary>
                )
            })}
        </ul>
    </>
}

export default ClassesAccordion