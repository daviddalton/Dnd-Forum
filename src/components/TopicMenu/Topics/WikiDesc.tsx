


function WikiDesc() {
    return (
        <div
            style={{
                
                display: "flex",
                backgroundImage: 'url(/DnDArtwork.png)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                width: '100%',
                overflow: 'auto',
                backgroundRepeat: 'no-repeat',
            }}>

        
        <div
        style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            width: '100%',
            height: '100vh',
        }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: 'fit-content',
                    height: '50px',
                    margin: '10px',
                    color: "white",
                    fontSize: '25px',
                    overflowY: 'hidden',
                }}>
                    Wiki Page
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '98%',
                    margin: '10px',
                    color: "white",
                }}>
                    Use this page to find the information you need, or to learn something new about the game.
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: '98%',
                    margin: '10px',
                    color: "white",
                }}>
                    Click a section to get started
                </div>

        </div>
        </div>
        
    )
}

export default WikiDesc