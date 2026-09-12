import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute - Role based access control
 * 
 * Usage:
 * <ProtectedRoute allowedRoles={["admin"]}>
 *   <AdminPage />
 * </ProtectedRoute>
 */

const roleRedirects = {
    admin: "/admin",
    supplier: "/supplier",
    inventoryManager: "/inventory",
    customer: "/",
};

export default function ProtectedRoute({ allowedRoles, children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Not logged in → go to login
    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }

    // Role not allowed → redirect to their own dashboard
    if (!allowedRoles.includes(role)) {
        const redirectPath = roleRedirects[role] || "/";
        return <Navigate to={redirectPath} replace />;
    }

    // Authorized ✅
    return children;
}
