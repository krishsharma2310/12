import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import "./Subjects.css";

function Subjects() {
  const { currentStudent } = useContext(StudentContext);

  if (!currentStudent) {
    return <Navigate to="/login" replace />;
  }

  const subjectsList = currentStudent.subjects ?? [];

  if (subjectsList.length === 0) {
    return <div className="subjects-empty">No subjects available</div>;
  }

  return (
    <div className="subjects-page">
      <div className="subjects-table-wrapper">
        <table className="subjects-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Code</th>
              <th>Instructor</th>
              <th>Credits</th>
              <th>Attendance</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subjectsList.map((subject) => {
              const attendance =
                currentStudent.attendance?.[subject.name] ?? 0;

              const marks =
                currentStudent.marks?.[subject.name] ?? 0;

              const attendanceClass =
                attendance < 75 ? "low" : "good";

              const marksClass =
                marks < 60 ? "fail" : marks < 75 ? "pass" : "good";

              return (
                <tr key={subject.code}>
                  <td>{subject.name}</td>
                  <td>{subject.code}</td>
                  <td>{subject.instructor}</td>

                  <td>{subject.credits}</td>

                  <td className={`attendance ${attendanceClass}`}>
                    {attendance}%
                  </td>

                  <td className={`marks ${marksClass}`}>
                    {marks}%
                  </td>

                  <td>
                    <div className="table-actions">
                      <Link to="/" className="btn-small">
                        📁 Materials
                      </Link>
                      <Link to="/assignments" className="btn-small secondary">
                        📝 Assignments
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subjects;