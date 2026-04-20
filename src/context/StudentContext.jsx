import { createContext, useState, useEffect } from "react";
import studentsData from "../data/students.js";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("students");
      const parsed = saved ? JSON.parse(saved) : studentsData;

      if (parsed && !parsed.some(s => s.subjects)) {
        localStorage.setItem("students", JSON.stringify(studentsData));
        return studentsData;
      }

      return parsed;
    } catch {
      return studentsData;
    }
  });

  const [currentStudent, setCurrentStudent] = useState(() => {
    try {
      const saved = localStorage.getItem("currentStudent");
      const parsed = saved ? JSON.parse(saved) : null;

      if (parsed && !parsed.subjects) {
        const match = studentsData.find(s => s.id === parsed.id);
        if (match) {
          localStorage.setItem("currentStudent", JSON.stringify(match));
          return match;
        }
      }

      return parsed;
    } catch {
      return null;
    }
  });

  const [dark, setDark] = useState(false); // false = light theme

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  const updateStudents = (newStudents) => {
    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  };

  const updateCurrentStudent = (student) => {
    setCurrentStudent(student);

    if (student) {
      setStudents(prev => {
        const updated = prev.map(s =>
          s.id === student.id ? { ...s, ...student } : s
        );
        localStorage.setItem("students", JSON.stringify(updated));
        return updated;
      });

      localStorage.setItem("currentStudent", JSON.stringify(student));
    } else {
      localStorage.removeItem("currentStudent");
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        updateStudents,
        currentStudent,
        updateCurrentStudent,
        dark,
        setDark
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}