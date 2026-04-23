import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoadingScreen } from "./components/LoadingScreen";
import { AuthProvider, useAuth } from "./features/auth/AuthContext";
import { TrackerProvider } from "./features/tracker/TrackerContext";
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import { DashboardPage, LoginPage, TopicsPage, ProgressPage,ProfilePage } from "./pages";

const ProtectedRoute = () => {
  const { isBootstrapping, isAuthenticated } = useAuth();

  if (isBootstrapping) {
    return <LoadingScreen label="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <TrackerProvider>
      <AuthenticatedLayout />
    </TrackerProvider>
  );
};

const PublicRoute = () => {
  const { isBootstrapping, isAuthenticated } = useAuth();

  if (isBootstrapping) {
    return <LoadingScreen label="Loading tracker..." />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />;
};

export const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="topics" element={<TopicsPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<PublicRoute />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
