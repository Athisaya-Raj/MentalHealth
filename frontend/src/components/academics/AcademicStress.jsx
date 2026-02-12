import { useState } from "react";

function AcademicStress({ setFormData, nextStep }) {
  const [stressLevel, setStressLevel] = useState(3);
  const [reason, setReason] = useState("");

  const handleNext = () => {
    // Mandatory check
    if (!reason) {
      alert("Please select the main reason for stress");
      return;
    }

    const stressData = {
      stressLevel: Number(stressLevel),
      reason,
    };

    // Save to parent state (flow control)
    setFormData((prev) => ({
      ...prev,
      academicStress: stressData,
    }));

    // Temporary persistence (replace with MongoDB API later)
    localStorage.setItem("academicStress", JSON.stringify(stressData));

    // Go to next section
    nextStep();
  };

  return (
    <>
      <h3>Academic Stress</h3>

      <label>Your academic stress level</label>
      <input
        type="range"
        min="1"
        max="5"
        value={stressLevel}
        onChange={(e) => setStressLevel(e.target.value)}
      />

      <label>Main reason for stress</label>
      <select value={reason} onChange={(e) => setReason(e.target.value)}>
        <option value="">Select</option>
        <option>Course load</option>
        <option>Continuous assessments</option>
        <option>Exam pressure</option>
        <option>Teaching pace</option>
      </select>

      {/* Right-aligned blue Next button */}
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

export default AcademicStress;
