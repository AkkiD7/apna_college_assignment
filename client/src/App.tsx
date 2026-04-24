import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoadingScreen } from "./components/LoadingScreen";
import { AuthProvider, useAuth } from "./features/auth/AuthContext";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import { TopicsPage } from "./features/topics/pages/TopicsPage";
import { ProgressProvider } from "./features/progress/ProgressContext";
import { DashboardPage } from "./features/progress/pages/DashboardPage";

const ProtectedRoute = () => {
  const { isBootstrapping, isAuthenticated } = useAuth();

  if (isBootstrapping) {
    return <LoadingScreen label="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ProgressProvider>
      <AuthenticatedLayout />
    </ProgressProvider>
  );
};

const PublicRoute = () => {
  const { isBootstrapping, isAuthenticated } = useAuth();

  if (isBootstrapping) {
    return <LoadingScreen label="Loading DSA sheet..." />;
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
        </Route>
        <Route path="/login" element={<PublicRoute />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
