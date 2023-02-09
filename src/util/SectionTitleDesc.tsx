import React, { useState } from 'react';
import '../components/styles/generalSectionDesc.css'

function SectionTitleDesc(props: any) {
    const [width, setWidth] = useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setWidth(window.innerWidth)
    }
    return(
        <div className="genSectionDesc-title-desc-container">
            <div className="genSectionDesc-title">
                <h1>{props.name}</h1>
            </div>
            <div 
                className="genSectionDesc-desc-container"
                style={{
                    fontSize: width > 350 ? ('15px'):('20px')
                }}>
                    {props.tempSection.desc.map((des: string) => (
                        <div key={des} className="genSectionDesc-desc">
                            <p>{des}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SectionTitleDesc