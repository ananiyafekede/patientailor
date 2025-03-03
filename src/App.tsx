import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MainLayout } from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Help = lazy(() => import("./pages/Help"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const PatientDashboard = lazy(() => import("./pages/patient/Dashboard"));
const DoctorDashboard = lazy(() => import("./pages/doctor/Dashboard"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminDashboard = lazy(() => import("@/components/admin/AdminDashboard"));
const UsersTable = lazy(() => import("./components/admin/UsersTable"));
const AppointmentsTable = lazy(
  () => import("./components/admin/AppointmentsTable")
);
const NotificationsTable = lazy(
  () => import("./components/admin/NotificationsTable")
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "red",
              },
            },
          }}
        />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Index />
                  </MainLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <MainLayout>
                    <About />
                  </MainLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <MainLayout>
                    <Contact />
                  </MainLayout>
                }
              />
              <Route
                path="/help"
                element={
                  <MainLayout>
                    <Help />
                  </MainLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <MainLayout>
                    <Login />
                  </MainLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <MainLayout>
                    <Register />
                  </MainLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Profile />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <MainLayout>
                      <PatientDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <MainLayout>
                      <DoctorDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UsersTable />} />
                <Route path="appointments" element={<AppointmentsTable />} />
                <Route path="notifications" element={<NotificationsTable />} />
                {/* <Route path="settings" element={<SettingsPage />} /> */}
                {/* <Route path="database" element={<DatabaseManagement />} /> */}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
