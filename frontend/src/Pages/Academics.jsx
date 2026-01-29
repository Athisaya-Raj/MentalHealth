import { useState } from "react";

import CourseLoad from "../components/academics/CourseLoad";
import AcademicStress from "../components/academics/AcademicStress";
import TeachingQuality from "../components/academics/TeachingQuality";
// import EvaluationMethods from "../components/academics/EvaluationMethods";
// import Suggestions from "../components/academics/Suggestions";

import "../styles/academics.css";

const sections = [
  "Course Load",
  "Academic Stress",
  "Teaching Quality",
  "Evaluation Methods",
  "Suggestions & Feedback"
];

function Academics() {
  const [active, setActive] = useState(0);

  return (
    <div className="academics-container">
      <h1>Academics Feedback</h1>
      <p className="subtitle">
        Your responses help the department improve academic experience
      </p>

      <div className="tab-bar">
        {sections.map((sec, index) => (
          <button
            key={index}
            className={`tab ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            {sec}
          </button>
        ))}
      </div>

      <div className="content-card">
        {active === 0 && <CourseLoad />}
        {active === 1 && <AcademicStress />}
        {active === 2 && <TeachingQuality />}
        {active === 3 && <EvaluationMethods />}
        {active === 4 && <Suggestions />}
      </div>
    </div>
  );
}

export default Academics;
