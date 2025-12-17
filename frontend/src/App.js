import "./style.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import DestinationPicker from "./DestinationPicker";
import BookingPage from "./BookingPage";
import AdminBookings from "./AdminBookings";

/* ✅ Normal login protection */
function PrivateRoute({ children }) {
  const uid = localStorage.getItem("uid");
  return uid ? children : <Navigate to="/" />;
}

/* ✅ Admin-only protection */
function AdminRoute({ children }) {
  const uid = localStorage.getItem("uid");
  const isAdmin = localStorage.getItem("is_admin") === "1";

  if (!uid) return <Navigate to="/" />;
  if (!isAdmin) return <Navigate to="/home" />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/pick"
          element={
            <PrivateRoute>
              <DestinationPicker />
            </PrivateRoute>
          }
        />

        <Route
          path="/book"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />

        {/* ✅ ADMIN ROUTE – THIS WAS THE ISSUE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
