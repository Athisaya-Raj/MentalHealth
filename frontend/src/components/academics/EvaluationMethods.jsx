import { useState } from "react";

function EvaluationMethods({ setFormData, nextStep }) {
  const [evaluation, setEvaluation] = useState({
    fairness: "Yes",
    stressType: "Internals",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // Save in parent state
    setFormData((prev) => ({
      ...prev,
      evaluationMethods: evaluation,
    }));

    // Temporary storage (MongoDB later)
    localStorage.setItem("evaluationMethods", JSON.stringify(evaluation));

    nextStep();
  };

  return (
    <>
      <h3>Evaluation Methods</h3>

      <label>Are evaluations fair?</label>
      <select
        name="fairness"
        value={evaluation.fairness}
        onChange={handleChange}
      >
        <option>Yes</option>
        <option>Somewhat</option>
        <option>No</option>
      </select>

      <label>Assessment type causing most stress</label>
      <select
        name="stressType"
        value={evaluation.stressType}
        onChange={handleChange}
      >
        <option>Internals</option>
        <option>End semester exams</option>
        <option>Assignments</option>
        <option>Projects</option>
      </select>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 22px",
            borderRadius: "8px",
            border: "none",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </>
  );
}

export default EvaluationMethods;
