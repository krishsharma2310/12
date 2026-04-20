import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import "./Navbar.css";

function Navbar() {
  const { currentStudent, updateCurrentStudent, dark, setDark } =
    useContext(StudentContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    updateCurrentStudent(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">StudentHub</div>

      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Dashboard</Link></li>
        <li><Link to="/subjects" className="nav-link">Subjects</Link></li>
        <li><Link to="/attendance" className="nav-link">Attendance</Link></li>
        <li><Link to="/assignments" className="nav-link">Assignments</Link></li>
                <li><Link to="/profile" className="nav-link">Profile</Link></li>

      </ul>

      <div className="nav-actions">
        <button
          className="mode-toggle"
          onClick={() => setDark(prev => !prev)}
          title={dark ? "Light Mode" : "Dark Mode"}
          aria-label="Toggle theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {currentStudent && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;