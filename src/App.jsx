// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SidebarLayout from "./components/layout/SidebarLayout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// Pages
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

// Admin
import AdminAllClasses from "./pages/admin/AdminAllClasses";

// Student
import StudentCourses from "./pages/StudentCourses/StudentCourses";

import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/all-classes"
          element={
            <SidebarLayout>
              <AdminAllClasses />
            </SidebarLayout>
          }
        />

        {/* Student routes  */}
        <Route
          path="/student/my-courses"
          element={
            <SidebarLayout>
              <StudentCourses />
            </SidebarLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
