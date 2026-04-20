import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { students, updateCurrentStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    const user = students.find(
      (s) =>
        s.email === email.trim() &&
        s.password === password
    );

    setTimeout(() => {
      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      updateCurrentStudent(user);
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/");
    }, 150);
  };

  return (
    <div className="login-hero">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your StudentHub account</p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;