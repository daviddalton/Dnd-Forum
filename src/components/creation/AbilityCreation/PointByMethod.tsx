import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'



function PointByMethod(props: any) {
    return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade">
        <div>Point By Method</div>
        </CSSTransition>
    )
}

export default PointByMethod