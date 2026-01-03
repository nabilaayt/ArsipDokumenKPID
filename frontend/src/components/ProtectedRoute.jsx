import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, allowedRole }) {
    const { role, isAuth, loading } = useAuth();
    
    // Fallback baca langsung dari localStorage
    const localRole = localStorage.getItem("role");
    const localToken = localStorage.getItem("token");

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-600">Memuat...</p>
            </div>
        );
    }

    // Cek isAuth dari hook ATAU localStorage
    const isAuthenticated = isAuth || (localToken && localRole);
    const userRole = role || localRole;

    if (!isAuthenticated) {
        console.log("Not authenticated, redirecting to login");
        return <Navigate to="/" replace />;
    }

    if (allowedRole && userRole !== allowedRole) {
        console.log("Role mismatch:", userRole, "vs", allowedRole);
        return <Navigate to="/" replace />;
    }

    return children;
}