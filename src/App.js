import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MasterProvider from "./master-controllers/master-provider";
import MasterPageController from "./master-controllers/master-pages-controller";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blog from "./pages/Blogs/blog";
import BlogPage from "./pages/Blogs/components/BlogPage/BlogPage";
import Tutorials from "./pages/Tutorials/tutorials";
import Pricing from "./pages/Pricing/pricing";
import Dashboard from "./pages/Dashboard/dashboard";
import Activity from "./pages/Activity/activity-main";
import Goals from "./pages/Goals/Goals";
import ModalComponent from "./common-components/ModalComponent/ModalComponent";
import TutorialPage from "./pages/Tutorials/components/TutorialPage/TutorialPage";
import Settings from "./pages/Settings/Settings";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute"; // Import it

function App() {
  const userInfo = {
    client_id:
      "1080965459053-gbll638aaglp0qbopn1msdld790knt21.apps.googleusercontent.com",
  };

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <MasterProvider clientId={userInfo.client_id}>
          <Routes>
            {/* Public routes */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<MasterPageController.Login />} />

            {/* Protected routes */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/spaces/notes" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/overall"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/current"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/budget"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/records"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tutorials"
              element={
                <ProtectedRoute>
                  <Tutorials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tutorials/page/:tutorialId"
              element={
                <ProtectedRoute>
                  <TutorialPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/:blogid"
              element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spaces/notes"
              element={
                <ProtectedRoute>
                  <MasterPageController.Space />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity/meals"
              element={
                <ProtectedRoute>
                  <Activity />
                </ProtectedRoute>
              }
            />

            {/* Catch all - NotFound */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <MasterPageController.NotFound />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MasterProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

