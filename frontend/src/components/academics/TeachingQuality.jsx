import { useState } from "react";

function TeachingQuality({ setFormData, nextStep }) {
  const [teachingQuality, setTeachingQuality] = useState({
    clarity: 3,
    pace: 3,
    practicalExamples: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeachingQuality((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleNext = () => {
    // Save in parent state
    setFormData((prev) => ({
      ...prev,
      teachingQuality,
    }));

    // Temporary storage (MongoDB later)
    localStorage.setItem("teachingQuality", JSON.stringify(teachingQuality));

    nextStep();
  };

  return (
    <>
      <h3>Teaching & Learning Experience</h3>

      <label>Clarity of teaching</label>
      <input
        type="range"
        min="1"
        max="5"
        name="clarity"
        value={teachingQuality.clarity}
        onChange={handleChange}
      />

      <label>Pace of syllabus coverage</label>
      <input
        type="range"
        min="1"
        max="5"
        name="pace"
        value={teachingQuality.pace}
        onChange={handleChange}
      />

      <label>Use of practical / real-world examples</label>
      <input
        type="range"
        min="1"
        max="5"
        name="practicalExamples"
        value={teachingQuality.practicalExamples}
        onChange={handleChange}
      />

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

export default TeachingQuality;
