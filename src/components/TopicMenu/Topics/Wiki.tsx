import React from "react";
import { Outlet } from "react-router-dom";


function Wiki() {
    
    return<>
    <div
        style={{
            width: '100%',
            marginTop: '60px',
            background: '#222831'
            
        }}>

                   
            <Outlet />
        
    </div>


    </>
}

export default Wiki;