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
            setLoading(true);

            const res = await loginApi(payload);

            const { token, user } = res.data.payload;
            const { role, nama, email } = user;


            const userData = { 
                role, 
                name: nama, 
                email,
                profile: null, 
            };

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));

            setToken(token);
            setUser(userData);

            setLoading(false);

            return userData;
        } catch (error) {
            setLoading(false);
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