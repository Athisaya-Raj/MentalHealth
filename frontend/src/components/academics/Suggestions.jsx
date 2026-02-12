import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Suggestions({ setFormData }) {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    stressReduction: "",
    learningImprovement: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFinish = () => {
    // Save in parent state
    setFormData((prev) => ({
      ...prev,
      suggestions: feedback,
    }));

    // Temporary save (MongoDB later)
    localStorage.setItem("suggestions", JSON.stringify(feedback));

    // Go back to Student Home
    navigate("/student/home");
  };

  return (
    <>
      {/* Home button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => navigate("/student/home")}
          style={{
            backgroundColor: "#e0ecff",
            color: "#1d4ed8",
            border: "1px solid #c7d9ff",
            padding: "8px 16px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 6px rgba(37, 99, 235, 0.15)",
            marginBottom: "10px",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb") &
            (e.currentTarget.style.color = "white")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#e0ecff") &
            (e.currentTarget.style.color = "#1d4ed8")
          }
        >
          🏠 Home
        </button>
      </div>


      <h3>Suggestions & Open Feedback</h3>

      <textarea
        rows="4"
        name="stressReduction"
        placeholder="What academic change would most reduce your stress?"
        value={feedback.stressReduction}
        onChange={handleChange}
      />

      <textarea
        rows="4"
        name="learningImprovement"
        placeholder="Any suggestions to improve learning experience?"
        value={feedback.learningImprovement}
        onChange={handleChange}
      />

      {/* Finish button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <button
          onClick={handleFinish}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Finish ✔
        </button>
      </div>
    </>
  );
}

export default Suggestions;
