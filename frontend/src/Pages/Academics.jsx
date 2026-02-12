import { useState } from "react";

import CourseLoad from "../components/academics/CourseLoad";
import AcademicStress from "../components/academics/AcademicStress";
import TeachingQuality from "../components/academics/TeachingQuality";
import EvaluationMethods from "../components/academics/EvaluationMethods";
import Suggestions from "../components/academics/Suggestions";

import "../styles/academics.css";

const sections = [
  "Course Load",
  "Academic Stress",
  "Teaching Quality",
  "Evaluation Methods",
  "Suggestions & Feedback",
];

function Academics() {
  const [active, setActive] = useState(0);

  // central form data (later → MongoDB)
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    setActive((prev) => Math.min(prev + 1, sections.length - 1));
  };

  return (
    <div className="academics-container">
      <h1>Academics Feedback</h1>
      <p className="subtitle">
        Your responses help the department improve academic experience
      </p>

      {/* Progress Tabs (visual only, optional click allowed) */}
      <div className="tab-bar">
        {sections.map((sec, index) => (
          <button
            key={index}
            className={`tab ${active === index ? "active" : ""}`}
            disabled={index > active}
            onClick={() => setActive(index)}
          >
            {sec}
          </button>
        ))}
      </div>

      <div className="content-card">
        {active === 0 && (
          <CourseLoad
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}

        {active === 1 && (
          <AcademicStress
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}

        {active === 2 && (
          <TeachingQuality
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}

        {active === 3 && (
          <EvaluationMethods
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}

        {active === 4 && (
          <Suggestions
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
}

export default Academics;
