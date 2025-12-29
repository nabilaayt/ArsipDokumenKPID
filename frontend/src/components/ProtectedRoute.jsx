import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, allowedRole }) {
    const { role, isAuth, loading } = useAuth();

    if (loading) {
        return null;
    }

    // // Belum login
    // if(!isAuth || !user) {
    //     return <Navigate to="/" replace />
    // }

    // // Jika role berbeda maka, arahkan sesuai role nya
    // if(allowedRole && user.role !== allowedRole) {
    //     if(user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    //     if(user.role === "user") return <Navigate to="/user/dashboard" replace />;
    //     return <Navigate to="/" replace />;
    // }

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};