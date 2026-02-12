import React from 'react';

const courseselector = ({ numberOfCourses, onCourseNumberChange }) => {
  const courseOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="course-selector-container">
      <div className="selector-card">
        <label htmlFor="course-count" className="selector-label">
          How many courses would you like to review?
        </label>
        <select
          id="course-count"
          value={numberOfCourses}
          onChange={(e) => onCourseNumberChange(Number(e.target.value))}
          className="course-select"
        >
          <option value={0}>Select number of courses</option>
          {courseOptions.map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Course' : 'Courses'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default courseselector;