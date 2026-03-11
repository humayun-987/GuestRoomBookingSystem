import { Navigate } from "react-router-dom";
import { useAuth, ROLE_HOME } from "./AuthContext";
import { Spin } from "antd";

/**
 * Usage:
 * <ProtectedRoute allowedRoles={["student"]}>
 *   <StudentDashboard />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong role → redirect to their own home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROLE_HOME[role] || "/login"} replace />;
  }

  return children;
}
