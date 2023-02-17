import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../components/styles/SectionAnimations.css'


export default function HomePage() {

    const nodeRef = React.useRef(null);

    return<>
    <CSSTransition
        nodeRef={nodeRef}
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
            <div
                ref={nodeRef}
                style={{
                    display: 'flex',
                    height: '100vh',
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div
                        style={{
                        
                            marginTop: '100px',
                            color: 'white',
                            opacity: '.6',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <h1>Welcome to Dnd Forum</h1>

                    </div>
            </div>
    </CSSTransition>
    </>
}

