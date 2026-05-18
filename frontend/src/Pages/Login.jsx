import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.jpeg";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Temporary easy login for teacher
    if (username === "teacher" && password === "teacher") {
      localStorage.setItem("userRole", "teacher");
      localStorage.setItem("teacherId", "teacher");
      navigate("/teacher");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid username or password");
      }

      if (data.admin) {
        localStorage.setItem("userRole", "admin");
        navigate("/admin");
      } else if (data.teacher) {
        localStorage.setItem("userRole", "teacher");
        localStorage.setItem("teacherId", data.teacherId || "teacher");
        navigate("/teacher");
      } else {
        localStorage.setItem("userRole", "student");
        localStorage.setItem("studentId", data.student.id);
        navigate("/student/home");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-login-container">
      {/* LEFT SIDE - LOGIN FORM */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="brand-header">
            <div className="brand-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="brand-title">Wellbeing Portal</h1>
          </div>

          <div className="login-form-wrapper">
            <h2 className="login-title">Welcome back</h2>
            <p className="login-subtitle">Please enter your details to sign in.</p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email / Username</label>
                <div className="input-wrapper">
                  <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="student@ssn.edu / admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="login-roles">
              <span className="role-badge">Student</span>
              <span className="role-badge">Teacher</span>
              <span className="role-badge">Admin</span>
            </div>

            <div className="support-text">
              <p>Don't have an account? <span onClick={() => navigate('/signup')} className="support-link">Sign Up</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - DECORATIVE SECTION */}
      <div className="login-right" style={{ backgroundImage: `url(${loginImage})` }}>
        <div className="login-right-overlay">
          <div className="decorative-content">
            <h2 className="decorative-title">Supporting Academic Success & Student Wellbeing</h2>
            <p className="decorative-subtitle">A comprehensive platform bridging the gap between academic pressure and mental health through actionable insights and direct mentorship.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;