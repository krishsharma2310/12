import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import "./Dashboard.css";

function Dashboard() {
  const { currentStudent } = useContext(StudentContext);

    const [stats, setStats] = useState({
      averageAttendance: 0,
      totalSubjects: 0,
      goodAttendanceSubjects: 0,
      grade: "-",
      name: "",
    });


  const [activity, setActivity] = useState([]);

  useEffect(() => {
    if (!currentStudent?.attendance) return;

    const values = Object.values(currentStudent.attendance);
    const avg =
      values.length > 0
        ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
        : 0;

    const goodAttendanceSubjects = values.filter(v => v >= 75).length;

    const grade =
      avg >= 90 ? "A+" : avg >= 80 ? "A" : avg >= 70 ? "B" : "C";

    setStats({
      averageAttendance: avg,
      totalSubjects: values.length,
      goodAttendanceSubjects,
      grade,
      name: currentStudent.name || "",
    });


    setActivity([
      { id: 1, type: "success", title: "Math attendance updated", time: "2 hours ago" },
      { id: 2, type: "warning", title: "Science attendance low", time: "1 day ago" },
      { id: 3, type: "success", title: "History attendance updated", time: "3 days ago" },
      { id: 4, type: "info", title: "New subject added: Art", time: "5 days ago" },
      { id: 5, type: "success", title: "Physical Education attendance updated", time: "1 week ago" },
      { id: 6, type: "warning", title: "Geography attendance low", time: "2 weeks ago" },
      { id: 7, type: "success", title: "English attendance updated", time: "3 weeks ago" },
    ]);
  }, [currentStudent]);

  if (!currentStudent) {
    return <div className="dashboard">No student data available.</div>;
  }

  return (
    <div className="dashboard">
      <div className=" dashboard-hero">
        <h1 className="dashboard-title">
          Welcome back, <span className="highlight">{stats.name}</span>
        </h1>
        <p className="dashboard-subtitle">
          Your current grade: <span className="grade">{stats.grade}</span>
        </p>
      </div>

      <div className="stats-grid">

        <div className="stats-card">
          <div className="stats-number">{stats.averageAttendance}%</div>
          <p>Average Attendance</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.averageAttendance}%` }}
            />
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-number">{stats.totalSubjects}</div>
          <p>Total Subjects</p>
        </div>

        <div className="stats-card">
          <div className="stats-number">{stats.goodAttendanceSubjects}</div>
          <p>Good Attendance Subjects</p>
        </div>

        <div className="stats-card">
          <div className="stats-number grade">{stats.grade}</div>
          <p>Current Grade</p>
        </div>

      </div>

      <div className="glass-card">
        <h2>Recent Activity</h2>
        <div className="activity-grid">
          {activity.map(item => (
            <div key={item.id} className={`activity ${item.type}`}>
              <strong>{item.title}</strong>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
        
        
      </div>

      <div className="glass-card">
        <h2>All Subjects</h2>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Attendance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(currentStudent.attendance).map(
              ([subject, percentage], index) => {
                const status =
                  percentage >= 75
                    ? "Excellent"
                    : percentage >= 60
                    ? "Good"
                    : "Needs Attention";

                return (
                  <tr key={subject}>
                    <td>{index + 1}</td>
                    <td>{subject}</td>

                    <td>
                      {percentage}%
                      <div className="mini-progress">
                        <div
                          className="mini-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </td>

                    <td>
                      <span className={`status ${status.split(" ")[0].toLowerCase()}`}>
                        <span className="status-dot" />
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;