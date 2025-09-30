import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyOtp from "./pages/VerifyOtp";
import ProjectsPage from "./pages/ProjectsPage";
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
    return (
        <AuthProvider>
        <Routes>
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        </AuthProvider>
    );
};

export default App;
