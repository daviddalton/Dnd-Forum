import CharacterClass from "../../../model/Character/Character/CharacterClass.interface"
import { Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {  AccordionSummary, Box, Modal, styled} from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom"
import fetch from "../../../api/fetch";
class ChildTrait {
    id: number;
    name: string;
    desc: string[] = []

    constructor(id: number, name: string, desc: string[]){
        this.id = id
        this.name = name
        this.desc = desc
    }
}
class ParentTrait {
    id: number;
    name: string;
    desc: string[] = [];
    childrenTraits: ChildTrait[] = [];

    constructor(id: number, name: string, desc: string[], childrenTraits: ChildTrait[]) {
        this.id = id
        this.name = name
        this.desc = desc
        this.childrenTraits = childrenTraits
    }
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };

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

function ClassPopoverContent(props: any) {

    const { data, status } = useQuery(['class', props.classSlug], FetchClass)
    const [showMore, setShowMore] = useState(false)
    const handleClose = () => props.setClicked(false);
    const handleShowMore = () => {
        if (showMore) {
            setShowMore(false)
        } else {
            setShowMore(true)
        }
    }
    
    function FetchClass(): Promise<CharacterClass> {
        return fetch(`https://api.open5e.com/classes/${props.classSlug}`)
    }
    var traitDirectory:ParentTrait[] = []
    var targetTraitDirectory: ParentTrait
    var targetChildDirectory: ChildTrait

    function cleanData() {
        var newData: string[] | undefined = []
        var cleanedData = data?.desc.replaceAll('×','x').replaceAll('*', '').split('\n')
        for (let i = 0; i < cleanedData!.length; i++ ) {
            if(cleanedData![i] === ' ') {
                cleanedData?.splice(i, 1)

            }
        }
        console.log(cleanedData)
        return cleanedData
    }

    function createTraitDirectory(array: string[] | undefined) {
        for(let i = 0; i < array!.length; i++) {
            var compareString = array![i].substring(0,4)
            var descString = array![i]
            if(compareString === '### '){
                createTraitParent(i, descString, i, array)
            }
            if (compareString === '####') {
                createTraitChild(i, descString, i, array)
            }
        }
    }
    function createTraitParent(id: number, descriptor: string, index: number, array: string[] | undefined) {
        var name = descriptor.replaceAll('#', '').trim()
        traitDirectory.push(new ParentTrait(id, name, [], []))
        targetTraitDirectory = traitDirectory[traitDirectory.length - 1]
        for(let i = index + 1; i < array!.length; i++) {
            let substring = array![i]
            if(substring[0] !== "#") {
                targetTraitDirectory.desc.push(substring)
            } else {
                break
            }
        }


    }
    function createTraitChild(id: number, descriptor: string, index: number, array: string[] | undefined) {
        var name = descriptor.replaceAll('#', '').trim()
        targetTraitDirectory.childrenTraits.push(new ChildTrait(id, name, []))
        targetChildDirectory = targetTraitDirectory.childrenTraits[targetTraitDirectory.childrenTraits.length - 1]
        for (let i = index + 1; i < array!.length; i++) {
            let substring = array![i]
            if (substring[0] !== "#") {
                targetChildDirectory.desc.push(substring)
            } else {
                break
            }
        }
    }

    if (data?.desc !== undefined) {
        var test: (string | undefined)[] = []
        var splitData = cleanData()
        createTraitDirectory(splitData)
        console.log(traitDirectory)
    
    }
    
    return(
        <div>
            <Modal
                open={props.clicked}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="class-modal-container">
                        <div className="class-modal-header-container">
                            <div className="class-modal-header-confirm">
                                Confirm Class
                            </div>
                            <div className="class-modal-header-x">
                                <h1
                                    onClick={handleClose}
                                >X</h1>
                            </div>
                        </div>
                        <div className="class-modal-body-container">
                            <div className="class-modal-body-flexrow">
                                <div className="class-modal-body-flexcolumn">
                                    <div className="class-modal-name">
                                        {data?.name}
                                    </div>
                                    <div className="class-modal-info">
                                        <div className="class-modal-hit-die">
                                            Hit Die: {data?.hit_dice}
                                        </div>
                                        <div className="class-modal-saving-throws">
                                            Saves: {data?.prof_saving_throws}
                                        </div>
                                        <div className="class-modal-subtype-name">
                                            Subtype Name: {data?.subtypes_name}
                                        </div>
                                    </div>
                                    <div className="class-modal-racial-trait-title">
                                        Class Traits:
                                    </div>
                                </div>
                                <div className="class-modal-image">
                                    
                                </div>
                            </div>
                            <div className="class-modal-race-buttton-container">
                                <Link to={`/races/${props.raceSlug}`}>
                                    <button className="class-modal-race-button">
                                        {data?.name} Details
                                    </button>
                                </Link>
                            </div>
                            {traitDirectory.map((parentTrait: ParentTrait) => (
                            <Accordion 
                            key={parentTrait.id}
                            expanded={true}
                            style={{
                                marginLeft: '10px',
                                marginTop: '10px',
                                marginRight: '10px',
                                background: '#3A3A3A',
                                border: '1px #C7C7C7 solid'
                            }}>
                            <AccordionSummary
                                expandIcon={<ExpandMore style={{
                                    color: '#E6E6E6'
                                }}/>}>
                                <Typography
                                    style={{color: 'white'}}>
                                    {parentTrait.name}
                                </Typography>
                            </AccordionSummary>
                            <div className="class-modal-accordion-text-container">
                                {showMore ? (
                                    <>
                                    <span id="ch" className="class-modal-span-container-false">
                                        {parentTrait.desc}
                                        {parentTrait.childrenTraits.map((childTrait: ChildTrait) => (
                                            <div>
                                                <div>
                                                    {childTrait.name}
                                                </div>
                                                <div>
                                                    {childTrait.desc}
                                                </div>
                                            </div>
                                        ))}
                                    </span>
                                    <div 
                                        className="class-modal-toggle-div"
                                        onClick={handleShowMore}>
                                            Show More
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    <span className="class-modal-span-container-true">
                                    {parentTrait.desc}
                                        {parentTrait.childrenTraits.map((childTrait: ChildTrait) => (
                                            <div>
                                                <h2>
                                                    {childTrait.name}
                                                </h2>
                                                <div>
                                                    {childTrait.desc.map((des: string) => (
                                                        <p>{des}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </span>
                                    <div 
                                        className="class-modal-toggle-div"
                                        onClick={handleShowMore}>
                                           
                                        </div>
                                    </>
                                )}

                            </div>
                        </Accordion>
                            ))}

                           
                        </div>
                        <div className="class-modal-button-container">
                            <button 
                                className="class-modal-confirm-button"
                                onClick={handleClose}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ClassPopoverContent