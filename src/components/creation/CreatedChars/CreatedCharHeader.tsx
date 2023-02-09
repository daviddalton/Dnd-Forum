import { flexbox } from "@mui/system"
import AbilityPointsGraphic from "./AbilityPointsGraphic"




function CreatedCharHeader(props: any) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                border: '1px white solid',
                height: '100%'
            }}>
                <div
                    style={{
                        border: '1px white solid',
                        display: "flex",
                        height: '100%',
                        width: 'fit-content',
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <div
                            style={{
                                border: '1px white solid',
                                height: '50%',
                                width: '100px'
                            }}>

                        </div>
                        <div
                            style={{
                                border: '1px white solid',
                                height: '50%',
                                width: 'fit-content'
                            }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        border: '1px white solid',
                                        height: '45%',
                                        width: 'fit-content'
                                    }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                border: '1px white solid',
                                                height: '100%',
                                                width: 'fit-content',
                                                marginLeft: '10px',
                                                alignItems: "center"
                                                
                                            }}>
                                                {props.character.characterName}
                                        </div>
                                        <div
                                            style={{
                                                border: '1px white solid',
                                                height: '100%',
                                                width: 'fit-content',
                                                marginLeft: '10px',
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <div
                                                    style={{
                                                        border: '1px white solid',
                                                        margin: '5px',
                                                        padding: '5px'
                                                    }}>
                                                    Manage
                                                </div>
                                                
                                        </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        border: '1px white solid',
                                        marginLeft: '10px',
                                        height: '25%',
                                        width: 'fit-content'
                                    }}>
                                        {props.character.race} {props.character.characterClass}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        border: '1px white solid',
                                        marginLeft: '10px',
                                        height: '25%',
                                        width: '100px'
                                    }}>
                                        Level: {props.character.level}
                                </div>
                        </div>
                </div>
                <div
                    style={{
                        border: '1px white solid',
                        display: "flex",
                        flexDirection: "column",
                        height: '100%',
                        width: '200px',
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <div
                            style={{
                                border: '1px white solid',
                                width: '180px',
                                height: '30px',
                            }}>
                                Short Rest
                        </div>
                        <div
                            style={{
                                border: '1px white solid',
                                width: '180px',
                                height: '30px',
                                marginTop: '10px'
                            }}>
                                Long Rest
                        </div>

                </div>
                <AbilityPointsGraphic 
                    character={props.character}/>
        </div>
    )
}

export default CreatedCharHeader