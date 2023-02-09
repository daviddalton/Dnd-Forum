import { AccordionSummary, Typography } from "@mui/material";
import { Link } from "react-router-dom";



function SpellsAccordion() {

    const classes = ["Bard", "Cleric", "Druid", "Paladin", "Sorcerer", "Wizard", "Warlock"]

    return<>
            <ul style={{
          color:'#E6E6E6'
        }}>
            {classes.map(clazz => {
                return(
                    <AccordionSummary key={clazz}>
                    <Typography>
                      <Link to={`/spells/${clazz}`}
                        className="subFolder"
                      >{clazz} Spells</Link>
                    </Typography>
                  </AccordionSummary>
                )
            })}
        </ul>
    </>
}

export default SpellsAccordion