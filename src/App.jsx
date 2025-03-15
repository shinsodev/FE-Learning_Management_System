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

import Profile from "./pages/Profile/Profile";

// Admin
import AdminAllClasses from "./pages/admin/AdminAllClasses";
import AdminCreateAdminLecturer from "./pages/admin/AdminCreateAdminLecturer";
import AdminListUsers from "./pages/admin/AdminListUsers";

// Student
import StudentAllClasses from "./pages/student/StudentAllClasses";
import StudentGrades from "./pages/student/StudentGrades";

// Lecturer
import LecturerAllClasses from "./pages/lecturer/LecturerAllClasses";
import LecturerGrades from "./pages/lecturer/LecturerGrades";

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

        <Route
          path="/admin/create-admin-lecturer"
          element={
            <SidebarLayout>
              <AdminCreateAdminLecturer />
            </SidebarLayout>
          }
        />

        <Route
          path="/admin/list-users"
          element={
            <SidebarLayout>
              <AdminListUsers />
            </SidebarLayout>
          }
        />

        {/* Student routes  */}
        <Route
          path="/student/all-classes"
          element={
            <SidebarLayout>
              <StudentAllClasses />
            </SidebarLayout>
          }
        />

        <Route
          path="/student/grade"
          element={
            <SidebarLayout>
              <StudentGrades />
            </SidebarLayout>
          }
        />

        {/* Lecturer routes  */}
        <Route
          path="/lecturer/all-classes"
          element={
            <SidebarLayout>
              <LecturerAllClasses />
            </SidebarLayout>
          }
        />

        <Route
          path="/lecturer/grade"
          element={
            <SidebarLayout>
              <LecturerGrades />
            </SidebarLayout>
          }
        />

        {/* Global  */}
        <Route
          path="/settings"
          element={
            <SidebarLayout>
              <Profile />
            </SidebarLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
