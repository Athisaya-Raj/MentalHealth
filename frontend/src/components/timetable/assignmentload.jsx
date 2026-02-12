import React from 'react';
import './timetable.css';
import SliderField from './SliderField';

/**
 * Module 3 — Assignment Load
 * Captures: load intensity, overlapping deadlines, review pressure, weekly submissions
 */
export default function AssignmentLoad({ data, onUpdate }) {
  const set = (key, val) => onUpdate('assignmentLoad', { ...data, [key]: val });

  return (
    <div className="tt-card">

      <div className="tt-card-header">
        <div className="tt-card-icon">📝</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Assignment & Submission Load</h2>
          <p className="tt-card-desc">
            Rate the academic workload from assignments, deadlines, internal reviews, and submission pressure throughout the week.
          </p>
        </div>
      </div>

      {/* Assignment Load Intensity */}
      <SliderField
        label="Assignment Load Intensity"
        name="loadIntensity"
        value={data.loadIntensity}
        min={1}
        max={10}
        lowLabel="Very light"
        highLabel="Overwhelming"
        onChange={set}
        gradient="#34d399, #ef4444"
      />

      <hr className="tt-divider" />

      {/* Overlapping Deadlines */}
      <div className="tt-field">
        <div className="tt-label">
          <span>Do you frequently have overlapping deadlines?</span>
        </div>
        <div className="tt-toggle-group">
          <button
            className={`tt-toggle-btn${data.overlappingDeadlines === true ? ' active-yes' : ''}`}
            onClick={() => set('overlappingDeadlines', true)}
          >
            ✓ Yes — Often stressful
          </button>
          <button
            className={`tt-toggle-btn${data.overlappingDeadlines === false ? ' active-no' : ''}`}
            onClick={() => set('overlappingDeadlines', false)}
          >
            ✗ No — Well spread out
          </button>
        </div>
        {data.overlappingDeadlines === true && (
          <p style={{
            marginTop: 10,
            padding: '10px 14px',
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: '#b91c1c',
          }}>
            ⚠️ Overlapping deadlines are a significant source of academic stress. Your input helps us flag this.
          </p>
        )}
      </div>

      <hr className="tt-divider" />

      {/* Internal Review Pressure */}
      <SliderField
        label="Internal Review / Viva Pressure"
        name="reviewPressure"
        value={data.reviewPressure}
        min={1}
        max={5}
        lowLabel="Relaxed"
        highLabel="Very stressful"
        onChange={set}
        gradient="#fbbf24, #dc2626"
      />

      <hr className="tt-divider" />

      {/* Weekly Submissions Count */}
      <div className="tt-field">
        <div className="tt-label">
          <span>Average Weekly Submission Count</span>
          <span className="tt-label-value">{data.weeklySubmissions}</span>
        </div>
        <div className="tt-number-input">
          <button
            className="tt-number-btn"
            onClick={() => set('weeklySubmissions', Math.max(0, data.weeklySubmissions - 1))}
          >−</button>
          <div className="tt-number-display">{data.weeklySubmissions}</div>
          <button
            className="tt-number-btn"
            onClick={() => set('weeklySubmissions', Math.min(20, data.weeklySubmissions + 1))}
          >+</button>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--slate-400)', marginLeft: 8 }}>
            {data.weeklySubmissions === 0
              ? 'None this week'
              : data.weeklySubmissions <= 2
              ? 'Manageable'
              : data.weeklySubmissions <= 5
              ? 'Busy'
              : 'Very High'}
          </span>
        </div>
      </div>
    </div>
  );
}