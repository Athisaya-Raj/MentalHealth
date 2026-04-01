import React from 'react';
import './teacher.css';

const MenteePanel = ({ data = [] }) => {
  // Assume a 2nd year and 3rd year subset for mockup mentees
  const mentees = data.filter(s => ['Student #05', 'Student #08', 'Student #10', 'Student #12'].includes(s.studentRef));

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>My Assigned Mentees</h3>
        <p>Monitor the wellbeing and progress of your 4 specific mentees.</p>
      </div>

      <div className="mentee-grid">
        {mentees.map(mentee => (
          <div key={mentee.id} className="mentee-card">
            <div className="mentee-card-header">
              <div className="mentee-avatar">👤</div>
              <div>
                <h4>{mentee.studentRef}</h4>
                <span>{mentee.year} Year</span>
              </div>
              <span className={`mentee-status-dot ${mentee.riskLevel}`}></span>
            </div>
            
            <div className="mentee-stats">
              <div className="stat-group">
                <label>Recent Stress Score</label>
                <strong>{mentee.exhaustion} / 10</strong>
              </div>
              <div className="stat-group">
                <label>Academic Workload</label>
                <strong>{mentee.workload} / 10</strong>
              </div>
              <div className="stat-group">
                <label>Last Response</label>
                <strong>{mentee.timestamp}</strong>
              </div>
            </div>

            <div className="mentee-feedback-snippet">
              <label>Latest Submission</label>
              <p>"{mentee.suggestion}"</p>
            </div>

            <div className="mentee-actions">
              <button className="primary-btn">Message Mentee</button>
              <button className="secondary-btn">Add Note</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenteePanel;
