import React from 'react';
import './timetable.css';
import SliderField from './SliderField';

/**
 * Module 4 — Time Availability
 * Captures: self-study time, placement prep time, extracurricular time, free-time satisfaction
 */
export default function TimeAvailability({ data, onUpdate }) {
  const set = (key, val) => onUpdate('timeAvailability', { ...data, [key]: val });

  const satisfactionOptions = [
    { value: '1', label: '😞 Very Unsatisfied' },
    { value: '2', label: '😕 Unsatisfied' },
    { value: '3', label: '😐 Neutral' },
    { value: '4', label: '😊 Satisfied' },
    { value: '5', label: '😄 Very Satisfied' },
  ];

  // Calculate total "allocated" hours for a simple visual
  const total = data.selfStudyTime + data.placementPrepTime + data.extracurricularTime;

  return (
    <div className="tt-card">

      <div className="tt-card-header">
        <div className="tt-card-icon">🕰️</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Time Availability</h2>
          <p className="tt-card-desc">
            Rate how much meaningful time you get for different priorities outside of scheduled college hours.
          </p>
        </div>
      </div>

      {/* Allocation Summary Bar */}
      {total > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex',
            borderRadius: 100,
            overflow: 'hidden',
            height: 10,
            background: '#e2e8f0',
          }}>
            <div style={{
              width: `${(data.selfStudyTime / Math.max(total, 1)) * 100}%`,
              background: '#3b82f6',
              transition: 'width 0.3s ease',
            }} />
            <div style={{
              width: `${(data.placementPrepTime / Math.max(total, 1)) * 100}%`,
              background: '#8b5cf6',
              transition: 'width 0.3s ease',
            }} />
            <div style={{
              width: `${(data.extracurricularTime / Math.max(total, 1)) * 100}%`,
              background: '#10b981',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <div style={{
            display: 'flex',
            gap: 16,
            marginTop: 8,
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'var(--slate-500)',
          }}>
            <span>🔵 Self-study</span>
            <span>🟣 Placement</span>
            <span>🟢 Extracurricular</span>
          </div>
        </div>
      )}

      {/* Self-Study Time */}
      <SliderField
        label="Time Available for Self-Study (hrs/week)"
        name="selfStudyTime"
        value={data.selfStudyTime}
        min={0}
        max={10}
        lowLabel="0 hrs"
        highLabel="10+ hrs"
        onChange={set}
        gradient="#60a5fa, #2563eb"
      />

      <hr className="tt-divider" />

      {/* Placement Prep Time */}
      <SliderField
        label="Time Available for Placement Prep"
        name="placementPrepTime"
        value={data.placementPrepTime}
        min={0}
        max={10}
        lowLabel="No time"
        highLabel="Plenty of time"
        onChange={set}
        gradient="#a78bfa, #7c3aed"
      />

      <hr className="tt-divider" />

      {/* Extracurricular Time */}
      <SliderField
        label="Time Available for Extracurriculars / Hobbies"
        name="extracurricularTime"
        value={data.extracurricularTime}
        min={0}
        max={10}
        lowLabel="No time"
        highLabel="Plenty of time"
        onChange={set}
        gradient="#34d399, #059669"
      />

      <hr className="tt-divider" />

      {/* Overall Free-Time Satisfaction */}
      <div className="tt-field">
        <div className="tt-label">
          <span>Overall Free-Time Satisfaction</span>
        </div>
        <div className="tt-radio-group">
          {satisfactionOptions.map(opt => (
            <div
              key={opt.value}
              className={`tt-radio-option${data.freeTimeSatisfaction === opt.value ? ' selected' : ''}`}
              onClick={() => set('freeTimeSatisfaction', opt.value)}
            >
              <span className="tt-radio-dot" />
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}