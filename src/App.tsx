import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/layout/Navbar";
import DashboardPage from "./pages/DashboardPage";
import IssueListPage from "./pages/IssueListPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import CreateIssuePage from "./pages/CreateIssuePage";
import EditIssuePage from "./pages/EditIssuePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <DashboardPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <IssueListPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues/new"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <CreateIssuePage />
              </>
            </ProtectedRoute>
          }
        />

<Route
          path="/issues/edit/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <EditIssuePage />
              </>
            </ProtectedRoute>
          }
        />


        <Route
          path="/issues/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <IssueDetailPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;