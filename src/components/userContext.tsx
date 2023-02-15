import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import React, { useState } from "react"
import { app } from "../firebase-config"
import { IAuthRouteProps } from "./AuthRoute"

const auth = getAuth(app)

type AuthContextState = { user: User | null, isInitialized: boolean}

const AuthContext = React.createContext<AuthContextState | undefined>(
    undefined
)
const AuthProvider: React.FunctionComponent<IAuthRouteProps>= ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isInitialized, setIsInitialized] = useState<boolean>(false)
    const value = { user, isInitialized };

    React.useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setIsInitialized(true);
        });
        return unSubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            'useAuth must be used within a AuthProvider',
        );
    }
    return context;
}

export { AuthProvider, useAuth };
