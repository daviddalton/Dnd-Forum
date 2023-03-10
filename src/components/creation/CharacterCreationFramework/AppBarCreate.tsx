
function AppBarCreate(props: any) {
    const sections = ['Settings', 'Race', 'Class', 'Abilities', 'Description', 'Equipment']

    const handleMouseEnter = (e: any) => {
        var compare = e.target.innerText
        if (compare !== props.currentPage){
            e.target.style.textShadow = "2px 2px black"
            e.target.style.opacity = '.8'
        }
    }
    const handleMouseLeave = (e: any) => {
        var compare = e.target.innerText
        if (compare !== props.currentPage) {
            e.target.style.textShadow = "0px 0px black"
            e.target.style.opacity = ".6"
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexWrap: 'wrap',
                justifyContent: "center",
                background: 'rgba(118, 30, 33, .6)',
                borderTopRightRadius: '10px',
                borderTopLeftRadius: '10px'
            }}>
                {sections.map((sec: string, index: number) => (
                    <div key={index}
                        style={{
                           paddingLeft: '20px',
                        }}>
                            <h2 
                                style={{
                                    cursor: 'pointer',
                                    boxShadow: sec === props.currentPage ? ('"2px 2px black"'):("0px 0px black"),
                                    opacity: sec === props.currentPage ? ('.8'):('.6'),
                                    fontFamily: 'buenard'
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => props.setCurrentPage(sec)}
                            >
                                {sec}
                            </h2>
                    </div>
                ))}
        </div>
    )
}

export default AppBarCreate


