import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "false"
    )

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminToken");
    };

    return(
        <AuthContext.Provider 
        value={{
            isLoggedIn, 
            login,
            logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () =>{
    return useContext(AuthContext);
} 