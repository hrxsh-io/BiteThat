import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, getCurrentUser } from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() =>
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

    // ==========================================
    // RESTORE / VERIFY EXISTING LOGIN
    // ==========================================

    useEffect(() => {
        const restoreSession = async () => {
            const savedToken = localStorage.getItem("token");

            if (!savedToken) {
                setLoading(false);
                return;
            }

            try {
                // Send JWT to backend
                const response = await getCurrentUser(savedToken);

                if (response?.user) {
                    setToken(savedToken);
                    setUser(response.user);

                    // Keep latest user information locally
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.user)
                    );
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Session restore failed:", error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

// ==========================================
// LOGIN
// ==========================================

const login = async (email, password, rememberMe = false) => {
    const response = await loginUser({
        email,
        password,
    });

    if (!response?.token || !response?.user) {
        console.error("Unexpected login response:", response);
        throw new Error("Invalid authentication response");
    }

    localStorage.setItem("token", response.token);
    localStorage.setItem(
        "user",
        JSON.stringify(response.user)
    );

    setToken(response.token);
    setUser(response.user);

    return response.user;
};


    // ==========================================
    // UPDATE USER
    // ==========================================

    const updateUser = (updatedUser) => {
        setUser(updatedUser);

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );
    };

    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    // ==========================================
    // AUTH STATE
    // ==========================================

    const isAuthenticated = Boolean(token && user);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ==========================================
// CUSTOM HOOK
// ==========================================

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
}