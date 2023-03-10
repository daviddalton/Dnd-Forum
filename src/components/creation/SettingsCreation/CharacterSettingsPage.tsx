import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionSummary, Typography } from "@mui/material"
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'
import '../../styles/settingsPage.css'


function CharacterSettingsPage(props: any): JSX.Element {
    const handleNameChange = (e: { target: { value: any } }) => {
        props.setCharacterName(e.target.value)
    }
    
   

    return(
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
        <div className="settings-container">
                <div className="settings-title-container">
                       <h1>Character Settings</h1>
                </div>
                <div style={{ borderTop: '1px black solid', width: '50%', boxShadow: '0px 1px 1px 0px black'}}/>
                <div className="character-settings-content">
                        <CharacterName characterName={props.characterName} handleNameChange={handleNameChange}/>
                        <AdvancementType advancementType={props.advancementType} setAdvancementType={props.setAdvancementType} />
                        <HitPointType hitPointType={props.hitPointType} setHitPointType={props.setHitPointType} />
                </div>
        </div>
        </CSSTransition>
    )
}

function CharacterName(props: any) {
    return (
        <div className="character-name-container">
            <div className="character-name-text-container">
                    <h4>Character Name:</h4>
            </div>
            <div className="character-name-input-container">
                    <input 
                        type="text" 
                        placeholder="Enter a name" 
                        value={props.characterName} 
                        onChange={(e) => props.handleNameChange(e)}/>
            </div>
    </div>
    )
}
function AdvancementType(props: any) {
    return (
        <div className="advancement-type-container">
                <div className="advancement-type-text-container">
                    <h4>Advancement Type:</h4>
                </div>
                <div className="advancement-type-accordion-container">
                        <Accordion
                            style={{
                                width: '100%',
                                background: 'rgba(118,30,33)',
                                color: "white"
                            }}>
                            <AccordionSummary
                                expandIcon={<ExpandMore style={{ color: 'white'}} />}>
                                <Typography>
                                    {props.advancementType}
                                </Typography>
                            </AccordionSummary>
                            <div className="advancement-type-milestone"
                                defaultValue={'Milestone'}
                                onClick={() => props.setAdvancementType('Milestone')}>
                                    Milestone
                            </div>
                            <div className="advancement-type-xp"
                                onClick={() => props.setAdvancementType('XP')}>
                                    XP
                            </div>
                        </Accordion>
                </div>
        </div>
    )
}
function HitPointType(props: any) {
    return (
        <div className="hit-point-container">
                <div className="hit-point-text-container">
                        <h4>Hit Point Type: </h4>
                </div>
                <div className="hit-point-accordion-container">
                        <Accordion
                            style={{
                                width: '100%',
                                background: '#761e21',
                                color: "white"
                            }}>
                            <AccordionSummary expandIcon={<ExpandMore style={{color: 'white'}}/>}>
                                <Typography>
                                    {props.hitPointType}
                                </Typography>
                            </AccordionSummary>
                            <div className="hit-point-fixed"
                                onClick={() => props.setHitPointType('Fixed')}>
                                    Fixed
                            </div>
                            <div className="hit-point-manual"
                                onClick={() => props.setHitPointType('Manual')}>
                                    Manual
                            </div>
                        </Accordion>
                </div>
        </div>
    )
}

export default CharacterSettingsPage



