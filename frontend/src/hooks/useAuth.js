import { useEffect, useState } from "react";
import { login as loginApi, logout as logoutApi } from "../services/auth";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if(storedToken && storedUser){
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    // Login
    const login = async (payload) => {
        try {
            const res = await loginApi(payload);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));

            setToken(res.data.token);
            setUser(res.data);

            return res;
        } catch (error) {
            console.error("Login gagal:", error); 
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await logoutApi();
        } catch (error) {
            console.error("Logout error:", error);
        }

        localStorage.clear();
        setToken(null);
        setUser(null);
    };

    const isAuth = !!token;
    const role = user?.role || null;
    const hasRole = (allowedRole) => role === allowedRole;

    return{
        user, 
        token,
        role,
        isAuth,
        loading,
        login,
        logout,
        hasRole,
    };

}