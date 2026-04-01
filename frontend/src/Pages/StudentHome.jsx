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
          <div className="module-card" onClick={() => navigate("/student/timetable")}>
            <h3>🗓 Timetable & Workload</h3>
            <p>Lab hours, theory balance, and timetable gaps.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/placements")}>
            <h3>💼 Placements & Internships</h3>
            <p>Internship status, placement stress, and expectations.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/student/course-wise-review")}>
            <h3>📚 CourseWise Review</h3>
            <p>Industry relevance of subjects and skill alignment.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/mentalwellbeing")}>
            <h3>🧠 Mental Wellbeing</h3>
            <p>Track mood, stress levels, and get support when needed.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/mentalwellbeing/resources")}>
            <h3>🌱 Wellbeing Resources</h3>
            <p>Relax, recharge, and feel better.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <p>.</p>
      </section>

    </div>
  );
}

export default StudentHome;









