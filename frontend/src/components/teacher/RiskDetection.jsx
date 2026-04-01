import React, { useState } from 'react';
import './teacher.css';

const RiskDetection = ({ data = [] }) => {
  const [filter, setFilter] = useState('all');

  const filteredStudents = data.filter((student) => {
    if (filter === 'all') return true;
    return student.riskLevel === filter;
  });

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>Risk Detection & Triage</h3>
        <p>Identify students showing signs of high academic stress and intervene.</p>
      </div>

      <div className="filter-group">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Students</button>
        <button className={`filter-btn ${filter === 'high' ? 'active' : ''}`} onClick={() => setFilter('high')}>🔴 High Risk</button>
        <button className={`filter-btn ${filter === 'moderate' ? 'active' : ''}`} onClick={() => setFilter('moderate')}>🟡 Moderate</button>
        <button className={`filter-btn ${filter === 'low' ? 'active' : ''}`} onClick={() => setFilter('low')}>🟢 Low Risk</button>
      </div>

      <div className="risk-table-container">
        <table className="risk-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Year</th>
              <th>Stress (1-10)</th>
              <th>Workload (1-10)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s.id} className={s.riskLevel === 'high' ? 'high-risk-row' : ''}>
                  <td>
                    <strong>{s.studentRef}</strong>
                    <div style={{ fontSize: '12px', color: s.riskLevel === 'high' ? '#fff' : '#666' }}>ID: {s.id}</div>
                  </td>
                  <td>{s.year}</td>
                  <td>
                    <span className={`badge ${s.exhaustion >= 8 ? 'badge-danger' : s.exhaustion >= 5 ? 'badge-warning' : 'badge-success'}`}>
                      {s.exhaustion} / 10
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${s.workload >= 8 ? 'badge-danger' : s.workload >= 5 ? 'badge-warning' : 'badge-success'}`}>
                      {s.workload} / 10
                    </span>
                  </td>
                  <td>
                    <span className={`risk-indicator ${s.riskLevel}`}>
                      {s.riskLevel.charAt(0).toUpperCase() + s.riskLevel.slice(1)} Risk
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" title="Message Student">✉️</button>
                      <button className="icon-btn" title="Schedule Check-in">📅</button>
                      <button className="icon-btn" title="Mark for Counseling">🆘</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No students found in this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskDetection;
