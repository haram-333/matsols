import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("matsols_token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Check if token is valid or just decode user info from it
            try {
                const base64Url = token.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split("")
                        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                        .join("")
                );
                const decoded = JSON.parse(jsonPayload);
                // Merge decoded token info with existing user state if available
                // or ensure role defaults to STUDENT if missing in token
                setUser(prev => ({
                    ...prev,
                    ...decoded,
                    role: decoded.role || prev?.role || 'STUDENT'
                }));
            } catch (e) {
                console.error("Invalid token", e);
                logout(true); // Pass true to indicate a redirect is desired if token is invalid
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const data = await apiService.login(email, password);
        if (data.token) {
            localStorage.setItem("matsols_token", data.token);
            localStorage.setItem("matsols_user", JSON.stringify(data.user));
            setToken(data.token);
            setUser(data.user);
            return { success: true, role: data.user.role };
        }
        return { success: false, error: data.error || "Login failed" };
    };

    const register = async (userData) => {
        const data = await apiService.register(userData);
        if (data.userId) {
            return { success: true };
        }
        return { success: false, error: data.error || "Registration failed" };
    };

    const updateUser = (userData) => {
        const newUser = { ...user, ...userData };
        setUser(newUser);
        localStorage.setItem("matsols_user", JSON.stringify(newUser));
    };

    const logout = (shouldRedirect = true) => {
        localStorage.removeItem("matsols_token");
        localStorage.removeItem("matsols_user");
        setToken(null);
        setUser(null);
        // Force a full reload to clear any sensitive state and prevent back-button access
        // ONLY if we aren't already on the login page to avoid infinite loops
        if (shouldRedirect && window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, updateUser, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
