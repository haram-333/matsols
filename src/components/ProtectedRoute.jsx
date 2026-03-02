import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading || (isAuthenticated && !user)) {
        return (
            <div className="auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <iconify-icon icon="eos-icons:loading" width="48" style={{ color: 'var(--primary-orange)' }}></iconify-icon>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login but save the current location to redirect back
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        // If logged in but role doesn't match
        console.warn(`Access denied. Required: ${requiredRole}, Current: ${user?.role}`);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
