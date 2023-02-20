import { styled } from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';


export const scoreTitles = ['Str', 'Dex', 'Con', 'Intl', 'Wis', 'Cha'];


export const Accordion = styled((props: AccordionProps) => (
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

  export const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    maxWidth: '780px',
    minWidth: '320px',
    width: '100%',
    height: 'fit-content',
    transform: 'translate(-50%, -40%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    background: '#393E46',
    padding: '10px',
    borderRadius: '10px',
  };