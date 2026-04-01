import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    classSection: "",
    registerNumber: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // successfully signed up, redirect to login
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="icon-wrapper">
          <svg
            className="header-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h1 className="main-title">Mental Health Monitoring System</h1>
        <p className="subtitle">Join us to prioritize your wellbeing</p>
      </div>

      <div className="login-box" style={{ maxWidth: '600px', width: '100%', marginTop: '1rem', padding: '2rem', boxSizing: 'border-box' }}>
        <h2 className="login-title">Sign Up</h2>
        <form onSubmit={handleSignup} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem', width: '100%' }}>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              name="department"
              className="form-input"
              placeholder="e.g. CSE"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Year</label>
            <input
              type="text"
              name="year"
              className="form-input"
              placeholder="e.g. 3rd Year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Class / Section</label>
            <input
              type="text"
              name="classSection"
              className="form-input"
              placeholder="e.g. A"
              value={formData.classSection}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Register Number</label>
            <input
              type="text"
              name="registerNumber"
              className="form-input"
              placeholder="Register Number"
              value={formData.registerNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email (used as username)"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="error-message" style={{ gridColumn: '1 / -1' }}>
              <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="support-text" style={{ marginTop: '1rem' }}>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate('/')}
              className="support-link"
              style={{ cursor: 'pointer' }}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <div className="login-footer" style={{ marginTop: 'auto' }}>
        <p>🌟 Your mental health matters. We're here to support you.</p>
      </div>
    </div>
  );
}

export default Signup;
