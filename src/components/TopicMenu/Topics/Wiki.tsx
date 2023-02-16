import React from "react";
import { Outlet } from "react-router-dom";


function Wiki() {
    
    return<>
    <div
        style={{
            width: '100%',
            display: "flex",
            marginTop: '60px',
            background: '#222831',
            justifyContent: "center"
            
        }}>
            <Outlet />
        
    </div>


    </>
}

export default Wiki;