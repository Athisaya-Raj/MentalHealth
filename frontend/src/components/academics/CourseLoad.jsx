import { useState } from "react";

function CourseLoad({ setFormData, nextStep }) {
  const [courseLoad, setCourseLoad] = useState({
    courses: "",
    difficulty: 3,
    balance: "Well balanced",
    deadlines: "Rare",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseLoad((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // save data centrally (later → MongoDB)
    setFormData((prev) => ({
      ...prev,
      courseLoad,
    }));

    nextStep(); // ✅ move to Academic Stress
  };

  return (
    <>
      <h3>Course Load</h3>

      <label>Number of courses this semester</label>
      <input
        type="number"
        min="1"
        max="10"
        name="courses"
        value={courseLoad.courses}
        onChange={handleChange}
      />

      <label>Overall difficulty level</label>
      <input
        type="range"
        min="1"
        max="5"
        name="difficulty"
        value={courseLoad.difficulty}
        onChange={handleChange}
      />

      <label>Balance between theory and labs</label>
      <select
        name="balance"
        value={courseLoad.balance}
        onChange={handleChange}
      >
        <option>Well balanced</option>
        <option>Too theory heavy</option>
        <option>Too lab heavy</option>
      </select>

      <label>Overlapping deadlines?</label>
      <select
        name="deadlines"
        value={courseLoad.deadlines}
        onChange={handleChange}
      >
        <option>Rare</option>
        <option>Sometimes</option>
        <option>Very frequent</option>
      </select>

      {/* Next button aligned right */}
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

export default CourseLoad;
