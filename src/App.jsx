import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";

import { StudentContext } from "./context/StudentContext";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";

function App() {
  const { dark } = useContext(StudentContext);
  const location = useLocation();

  const isAuthPage = location.pathname === "/login";

  return (
    <div
      className="app-wrapper"
      data-theme={dark === true ? "dark" : "light"}
    >
      {!isAuthPage && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/assignments" element={<Assignments />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;