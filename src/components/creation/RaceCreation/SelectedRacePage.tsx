import {  AccordionSummary, styled, Typography } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import '../../styles/raceCreate.css'



function SelectedRacePage() {

    const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
      }));

    const fakeData = [1,1,1,1,1,1,1]

    return(
        <div style={{
            background: '#454545',
            border: '1px white solid',
            display: 'flex',
            flexDirection: 'column',
            width: '686px',
            height: '755px'
        }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: '15px',
                    marginLeft: '5px',
                    border: '1px white solid',
                    height: '150px',
                    width: '676px'
                }}>
                    <div
                        style={{
                            marginTop: '5px',
                            marginLeft: '5px',
                            border: '1px white solid',
                            height: '140px',
                            width: '140px'
                        }}>
                            image
                    </div>
                    <div
                        style={{
                            marginTop: '5px',
                            marginLeft: '5px',
                            border: '1px white solid',
                            height: '140px',
                            width: '515px'
                        }}>
                            Description
                    </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5px',
                    marginLeft: '5px',
                    border: '1px white solid',
                    height: '150px',
                    width: '676px'
                }}>
                    <div
                        style={{
                            marginTop: '5px',
                            marginLeft: '5px',
                            border: '1px white solid',
                            height: '40px',
                            width: '140px'
                        }}>
                            <button
                                style={{
                                    width: '140px',
                                    height: '40px',
                                    background: '#B70B0B',
                                    color: 'white',
                                    fontSize: '25px',
                                    fontFamily: 'buenard',
                                    borderStyle: 'none',
                                    cursor: 'pointer'
                                }}>
                                    To race
                            </button>
                    </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5px',
                    marginLeft: '5px',
                    border: '1px white solid',
                    height: '420px',
                    width: '676px'
                }}>

                    {fakeData.map((data) => (
                        <><div
                            style={{
                                border: '1px white solid',
                                height: '50px',
                                width: '90%'
                            }}>
                            <Accordion
                                expanded={true}>
                                <AccordionSummary>
                                    <Typography>
                                        {data}
                                    </Typography>
                                </AccordionSummary>
                            </Accordion>
                        </div></>
                    ))}
                    
            </div>

        </div>
    )
}

export default SelectedRacePage