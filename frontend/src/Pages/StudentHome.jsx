import "./../styles/StudentHome.css";
import { useNavigate } from "react-router-dom";

function StudentHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="home-container">
      
      {/* Header */}
      <header className="home-header">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        <h1>DEPARTMENT OF INFORMATION TECHNOLOGY</h1>
        <p>
          A department-focused platform to understand academic pressure,
          workload, placements, and overall well-being of students.
        </p>
      </header>

      {/* Modules Section */}
      <section className="modules-section">
        <h2>Student Mental Health Monitoring System</h2>

        <div className="modules-grid">
          <div className="module-card" onClick={() => navigate("/academics")}>
            <h3>📘 Academics</h3>
            <p>Course load, subject difficulty, and academic pressure.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/student/timetable")}>
            <h3>🗓 Timetable & Workload</h3>
            <p>Lab hours, theory balance, and timetable gaps.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/student/placement")}>
            <h3>💼 Placements & Internships</h3>
            <p>Internship status, placement stress, and expectations.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/student/course-wise-review")}>
             <h3>📚 CourseWise Review</h3>
              <p>Industry relevance of subjects and skill alignment.</p> 
              </div>

          <div className="module-card">
            <h3>💙 Mental Well-Being</h3>
            <p>Stress levels, motivation, and emotional health.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <p>Your responses help the department improve student experience.</p>
        <button className="start-btn">Get Started</button>
      </section>

    </div>
  );
}

export default StudentHome;
