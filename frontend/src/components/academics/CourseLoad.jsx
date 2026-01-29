function CourseLoad() {
  return (
    <>
      <h3>Course Load</h3>

      <label>Number of courses this semester</label>
      <input type="number" min="1" max="10" />

      <label>Overall difficulty level</label>
      <input type="range" min="1" max="5" />

      <label>Balance between theory and labs</label>
      <select>
        <option>Well balanced</option>
        <option>Too theory heavy</option>
        <option>Too lab heavy</option>
      </select>

      <label>Overlapping deadlines?</label>
      <select>
        <option>Rare</option>
        <option>Sometimes</option>
        <option>Very frequent</option>
      </select>
    </>
  );
}

export default CourseLoad;
