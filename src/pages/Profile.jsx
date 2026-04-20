import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import "./Profile.css";

function Profile() {
  const { currentStudent, updateCurrentStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!currentStudent) return;
    setFormData({
      name: currentStudent.name ?? "",
      email: currentStudent.email ?? "",
    });
  }, [currentStudent]);

  if (!currentStudent) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    updateCurrentStudent(null);
    navigate("/login");
  };

  const avatarText = useMemo(() => {
    if (!formData.name) return "ID";
    return formData.name
      .split(" ")
      .map(word => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [formData.name]);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{avatarText}</div>
          <span className="profile-id">
            Student ID: #{currentStudent.id}
          </span>
        </div>

        <h1 className="profile-name">{formData.name || "N/A"}</h1>
        <p className="profile-email">{formData.email || "N/A"}</p>

        <div className="profile-actions">
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="performance-section">
        <h2>Academic Performance</h2>

        <div className="performance-grid">
          {Object.entries(currentStudent.marks ?? {}).map(
            ([subject, percentage]) => (
              <div key={subject} className="subject-card">
                <div className="subject-percent">{percentage}%</div>
                <h3 className="subject-name">{subject}</h3>
                <progress value={percentage} max={100} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;