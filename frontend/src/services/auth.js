import axiosInstance from "./axiosInstance";

// Login
export const login = async (payload) => {
    const response = await axiosInstance.post("/auth/login", payload);
    return response;
};

// Logout
export const logout = async (payload) => {
    const response = await axiosInstance.post("/auth/logout", payload);
    return response;
};