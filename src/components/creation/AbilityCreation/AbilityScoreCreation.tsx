import { useState } from "react";
import ManualRolledMethod from "./ManualRolledMethod";
import PointByMethod from "./PointByMethod";
import StandardMethod from "./StandardMethod";

function AbilityScoreCreation(props: any) {
    class Method {
        methodName!: string;
        clicked!: boolean;

        constructor(methodName: string, clicked: boolean) {
            this.methodName = methodName
            this.clicked = clicked
        }
    }

    const [method, setMethod] = useState("Standard Array")

    var standardArray = new Method('Standard Array', true)
    var manualRolled = new Method('Manual / Rolled', false)
    var pointBy = new Method('Point By', false)

    const [options, setoptions] = useState<Method[]>([standardArray, manualRolled, pointBy])

    const handleMethodClick = (method: Method) => {
        setMethod(method.methodName)
        options.forEach((m: Method) => {
            if (m === method) {
                m.clicked = !m.clicked
            } else {
                m.clicked = false
            }
        })
        setoptions([standardArray, manualRolled, pointBy])
    }

    
    return (
        <div
            style={{
                border: '1px white solid',
                background: 'rgba(57,62,70,.6'
            }}>
                <AbilityScoreCreationTitle />
                <ChooseAMethodText />
                <AbilityScoreCreationMethodsAccordion 
                    setMethod={setMethod} 
                    handleMethodClick={handleMethodClick}
                    options={options}/>
                {method === 'Standard Array' ? (
                    <StandardMethod 
                    scores={props.scores}
                    setScores={props.setScores}
                    strength={props.strength}
                    dexterity={props.dexterity}
                    constitution={props.constitution}
                    intelligence={props.intelligence}
                    wisdom={props.wisdom}
                    charisma={props.charisma}
                    setStrength={props.setStrength}
                    setDexterity={props.setDexterity}
                    setConstitution={props.setConstitution}
                    setIntelligence={props.setIntelligence}
                    setWisdom={props.setWisdom}
                    setCharisma={props.setCharisma}
                    aScoreSetStrength={props.aScoreSetStrength}
                    aScoreSetDexterity={props.aScoreSetDexterity}
                    aScoreSetCon={props.aScoreSetCon}
                    aScoreSetIntel={props.aScoreSetIntel}
                    aScoreSetWis={props.aScoreSetWis}
                    aScoreSetCharisma={props.aScoreSetCharisma}
                    aScoreStrength={props.aScoreStrength}
                    aScoreDexterity={props.aScoreDexterity}
                    aScoreCon={props.aScoreCon}
                    aScoreIntel={props.aScoreIntel}
                    aScoreWis={props.aScoreWis}
                    aScoreCharisma={props.aScoreCharisma}/>
                ): method === 'Manual / Rolled' ? (
                    <ManualRolledMethod />
                ): method === 'Point By' ? (
                    <PointByMethod />
                ):(
                    <div></div>
                )}
        </div>
    )
}

function AbilityScoreCreationTitle() {
    return (
        <div
        style={{
            border: '1px white solid',
            display: 'flex',
            margin: '5px',
            justifyContent: "center"
        }}>
            <h1>Modify your ability scores</h1>
    </div>
    )
}

function AbilityScoreCreationMethodsAccordion(props: any) {
    class Method {
        methodName!: string;
        clicked!: boolean;

        constructor(methodName: string, clicked: boolean) {
            this.methodName = methodName
            this.clicked = clicked
        }
    }

    return (
        <div
            style={{
                border: '1px white solid',
                margin: '5px',
                display: 'flex',
                justifyContent: 'center',
            }}>
                {props.options.map((method: Method) => (
                    <div style={{ paddingRight: '10px' }}>
                    <label>{method.methodName}</label>
                    <input 
                        type="radio" 
                        name="method"
                        value={method.methodName}
                        defaultChecked={method.clicked}
                        onClick={() => props.handleMethodClick(method)}/>
                    </div>
                ))}
        </div>
    )
}

function ChooseAMethodText() {
    return (
        <div
            style={{
                border: '1px white solid',
                margin: '5px',
                display: 'flex',
                justifyContent: "center"
            }}>
                Choose a method below
        </div>
    )
}

export default AbilityScoreCreation