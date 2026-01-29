function AcademicStress() {
  return (
    <>
      <h3>Academic Stress</h3>

      <label>Your academic stress level</label>
      <input type="range" min="1" max="5" />

      <label>Main reason for stress</label>
      <select>
        <option>Course load</option>
        <option>Continuous assessments</option>
        <option>Exam pressure</option>
        <option>Teaching pace</option>
      </select>
    </>
  );
}

export default AcademicStress;
