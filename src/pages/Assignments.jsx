import { useMemo, useState } from "react";
import "./Assignments.css";

const STATUSES = [
  { key: "todo", label: "To Do" },
  { key: "progress", label: "In Progress" },
  { key: "done", label: "Done" }
];

function Assignments() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "DSA Assignment", due: "2024-01-15", status: "todo" },
    { id: 2, title: "Python Programming Lab Report", due: "2024-01-10", status: "progress" },
    { id: 3, title: "Maths  Homework", due: "2024-01-12", status: "done" },
    { id: 4, title: "English Essay", due: "2024-01-20", status: "todo" }
  ]);

  const moveTo = (id, status) => {
    setAssignments(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );
  };

  const grouped = useMemo(() => {
    return STATUSES.reduce((acc, { key }) => {
      acc[key] = assignments.filter(a => a.status === key);
      return acc;
    }, {});
  }, [assignments]);

  return (
    <div className="assignments">
      <div className="Ass-grid">
        {STATUSES.map(({ key, label }) => (
          <section key={key} className={`Ass-column ${key}`}>
            <header className="Ass-header">
              <h3>{label}</h3>
              <span className="Ass-count">{grouped[key].length}</span>
            </header>

            <div className="Ass-list">
              {grouped[key].map(a => (
                <article key={a.id} className="assignment-card">
                  <h4>{a.title}</h4>
                  <p>Due {a.due}</p>

                  <div className="actions">
                    <button
                      onClick={() => moveTo(a.id, "progress")}
                      disabled={key === "progress"}
                    >
                      ⏳ Progress
                    </button>
                    <button
                      onClick={() => moveTo(a.id, "done")}
                      disabled={key === "done"}
                    >
                      ✅ Done
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Assignments;