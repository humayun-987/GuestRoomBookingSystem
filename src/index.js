import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Styles
import "./css/index.css";
import "./css/utils.css";
import 'react-toastify/dist/ReactToastify.css';

// Toast
import { ToastContainer } from "react-toastify";

// Auth
import { AuthProvider } from "./pages/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

// Pages
import LandingPage    from "./pages/LandingPage.jsx";
import Home           from "./pages/Home.jsx";
import FAQ            from "./pages/FAQ.jsx";

// New Auth pages
import Login  from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// Role dashboards
import StudentDashboard   from "./pages/StudentDashboard.jsx";
import WardenDashboard    from "./pages/WardenDashboard.jsx";
import CaretakerDashboard from "./pages/CaretakerDashboard.jsx";
import AdminHostels       from "./pages/AdminHostels.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>

          {/* ── Landing & public ── */}
          <Route path="/"    element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/FAQ"  element={<FAQ />} />

          {/* ── Auth pages ── */}
          <Route path="/login"  element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ── Old routes → redirect to new ones ── */}
          <Route path="/individual_login"  element={<Navigate to="/login"  replace />} />
          <Route path="/individual_signup" element={<Navigate to="/signup" replace />} />

          {/* ── Student ── */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          } />

          {/* ── Warden ── */}
          <Route path="/warden/dashboard" element={
            <ProtectedRoute allowedRoles={["warden"]}>
              <WardenDashboard />
            </ProtectedRoute>
          } />

          {/* ── Caretaker ── */}
          <Route path="/caretaker/dashboard" element={
            <ProtectedRoute allowedRoles={["caretaker"]}>
              <CaretakerDashboard />
            </ProtectedRoute>
          } />

          {/* ── Admin ── */}
          <Route path="/admin/hostels" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHostels />
            </ProtectedRoute>
          } />

          {/* ── Catch-all → landing ── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);