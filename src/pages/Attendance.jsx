import { useContext, useMemo, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import "./Attendance.css";

function Attendance() {
  const { currentStudent, dark } = useContext(StudentContext);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [view, setView] = useState("cards");

  const themeClass = dark ? "dark" : "light";

  if (!currentStudent || !currentStudent.subjects) {
    return (
      <div className={`attendance-empty ${themeClass}`}>
        <div className="attendance-empty-icon">📊</div>
        <h1 className="attendance-title">Attendance Dashboard</h1>
        <p className="attendance-subtitle">
          Log in to track your attendance records with complete statistics.
        </p>
      </div>
    );
  }

  const getStatus = (percentage) => {
    if (percentage < 75) return "low";
    if (percentage < 85) return "average";
    return "excellent";
  };

  /* ---------- Deterministic Attendance Data ---------- */
  const attendanceData = useMemo(() => {
    return currentStudent.subjects.map(subject => {
      const percentage = currentStudent.attendance?.[subject.name] ?? 0;
      const totalSessions = 30;
      const presentSessions = Math.round((percentage / 100) * totalSessions);

      return {
        ...subject,
        percentage,
        totalSessions,
        presentSessions
      };
    });
  }, [currentStudent]);

  /* ---------- Calendar Generator ---------- */
  const generateCalendar = (year, month, percentage) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const presentDays = Math.round(daysInMonth * (percentage / 100));

    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      status: i < presentDays ? "present" : "absent"
    }));

    return [
      ...Array(firstDay).fill(null),
      ...days
    ];
  };

  const calendarDays = selectedSubject
    ? generateCalendar(
      2024,
      9,
      attendanceData.find(s => s.name === selectedSubject)?.percentage ?? 0
    )
    : [];

  return (
    <div className={`attendance-container ${themeClass}`}>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">
            {Math.round(
              attendanceData.reduce((a, b) => a + b.percentage, 0) /
              attendanceData.length
            )}%
          </div>
          <div className="stat-label">Overall Average</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{attendanceData.length}</div>
          <div className="stat-label">Subjects</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            {attendanceData.reduce((a, b) => a + b.totalSessions, 0)}
          </div>
          <div className="stat-label">Total Sessions</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            {attendanceData.filter(s => s.percentage >= 75).length}
          </div>
          <div className="stat-label">Good Subjects</div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={view === "cards" ? "active" : ""}
          onClick={() => setView("cards")}
        >
          📊 Cards
        </button>
        <button
          className={view === "calendar" ? "active" : ""}
          onClick={() => setView("calendar")}
          disabled={!selectedSubject}
        >
          📅 Calendar
        </button>
      </div>

      
      {view === "cards" && (
        <div className="attendance-cards">
          {attendanceData.map(subject => (
            <div key={subject.code} className="attendance-card">
              <header>
                <h3>{subject.name}</h3>
                <span className={`status ${getStatus(subject.percentage)}`}>
                  {subject.percentage}%
                </span>
              </header>

              <p>{subject.code} • {subject.instructor}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${subject.percentage}%` }}
                />
              </div>

              <small>
                {subject.presentSessions} / {subject.totalSessions} sessions
              </small>

              <button
                className="history-btn"
                onClick={() => {
                  setSelectedSubject(subject.name);
                  setView("calendar");
                }}
              >
                📅 View Calendar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && selectedSubject && (
        <div className="calendar-wrapper">
          <h2>📅 {selectedSubject} — October 2024</h2>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="calendar-day-header">{d}</div>
            ))}

            {calendarDays.map((day, i) =>
              day ? (
                <div key={i} className={`calendar-day ${day.status}`}>
                  {day.day}
                  <div className="day-dot" />
                </div>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;