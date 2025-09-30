import React, { createContext, useState, useEffect } from "react";

type AuthContextType = {
    token: string | null;
    role: string | null;
    setAuth: (t: string | null, r?: string | null) => void;
    };

    export const AuthContext = createContext<AuthContextType>({
    token: null,
    role: null,
    setAuth: () => {},
    });

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

    useEffect(() => {
        // keep in sync
    }, []);

    const setAuth = (t: string | null, r: string | null = null) => {
        if (t) {
        localStorage.setItem("token", t);
        if (r) localStorage.setItem("role", r);
        } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        }
        setToken(t);
        setRole(r);
    };

    return <AuthContext.Provider value={{ token, role, setAuth }}>{children}</AuthContext.Provider>;
};
