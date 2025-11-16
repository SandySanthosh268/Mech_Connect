import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

// Customer pages
import Dashboard from "./pages/customer/Dashboard";
import Search from "./pages/customer/Search";
import Bookings from "./pages/customer/Bookings";
import Profile from "./pages/customer/Profile";
import Reviews from "./pages/customer/Reviews";

// Mechanic pages
import MechanicDashboard from "./pages/mechanic/Dashboard";
import Earnings from "./pages/mechanic/Earnings";
import MechanicReviews from "./pages/mechanic/Reviews";
import MechanicProfile from "./pages/mechanic/Profile";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageServices from "./pages/admin/ManageServices";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔐 Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👥 Customer routes */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/search"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/reviews"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Reviews />
            </ProtectedRoute>
          }
        />

        {/* 🔧 Mechanic routes */}
        <Route
          path="/mechanic/dashboard"
          element={
            <ProtectedRoute role="MECHANIC">
              <MechanicDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mechanic/earnings"
          element={
            <ProtectedRoute role="MECHANIC">
              <Earnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mechanic/reviews"
          element={
            <ProtectedRoute role="MECHANIC">
              <MechanicReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mechanic/profile"
          element={
            <ProtectedRoute role="MECHANIC">
              <MechanicProfile />
            </ProtectedRoute>
          }
        />

        {/* 🧑‍💼 Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute role="ADMIN">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-services"
          element={
            <ProtectedRoute role="ADMIN">
              <ManageServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="ADMIN">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
