import { SubSection } from "../model/Character/SubSection.class";
import '../components/styles/generalSubtopic.css'
import React, { useState } from "react";
import '../components/styles/sOfS.css'

function GeneralSubsectionContainer(props: any) {
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setWidth(window.innerWidth)
    }
    return (
        <div className='subtopics-container' style={{ border: '1px white solid' }}>
            {props.tempSection?.subSections.map((subSec: SubSection) => (
                <><div className='indv-subtopic-container'
                    style={{

                    }}>
                    <div className='subtopic-title'
                        style={{
                            borderTopLeftRadius: '10px'
                        }}>
                        <h2 key={subSec.title}>{subSec.title}</h2>
                    </div>
                    <div className='subtopic-desc-container'
                        style={{
                            borderBottomRightRadius: '10px',
                            borderBottomLeftRadius: '10px'
                        }}>
                        <div className='subtopic-desc'
                            style={{
                                fontSize: width > 350 ? ('15px') : ('20px'),
                                
                            }}>
                            {subSec.desc.map((des: string) => (
                                <div>
                                    <p>{des}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                </>
            ))}
        </div>
    )
}

export default GeneralSubsectionContainer