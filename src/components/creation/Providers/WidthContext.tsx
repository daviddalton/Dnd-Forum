import React from "react"
import { useState } from "react"
import { IAuthRouteProps } from "./AuthRoute"

type WidthContextState = { width: number | undefined }

const WidthContext = React.createContext<WidthContextState | undefined>(
    undefined
)
const WidthProvider: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const value = { width };

    function handleResize() {
        setWidth(window.innerWidth)
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleResize );
        return () => window.removeEventListener("resize", handleResize)
    })

    return (
        <WidthContext.Provider value={value}>
            {children}
        </WidthContext.Provider>
    )
}

const useWidth = () => {
    const context = React.useContext(WidthContext);
    if (context === undefined) {
        throw new Error(
            'useWidth must be used within WidthProvider'
        );
    }
    return context
}

export { WidthProvider, useWidth }