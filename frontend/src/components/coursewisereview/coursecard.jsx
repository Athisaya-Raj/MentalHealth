import React from 'react';

const coursecard = ({ children, courseNumber }) => {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3>Course {courseNumber}</h3>
      </div>
      <div className="course-card-body">
        {children}
      </div>
    </div>
  );
};

export default coursecard;