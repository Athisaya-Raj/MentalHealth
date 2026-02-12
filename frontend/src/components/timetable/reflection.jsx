import React from 'react';
import './timetable.css';

/**
 * Module 8 — Personal Reflection
 * Two open-ended text areas: biggest stress & improvement suggestions
 */
export default function Reflection({ data, onUpdate }) {
  const set = (key, val) => onUpdate('reflection', { ...data, [key]: val });

  const MAX_CHARS = 500;

  return (
    <div className="tt-card">

      <div className="tt-card-header">
        <div className="tt-card-icon">✍️</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Personal Reflection</h2>
          <p className="tt-card-desc">
            Share your thoughts openly. Your responses help us understand the real student experience beyond numbers and sliders.
          </p>
        </div>
      </div>

      {/* Biggest Timetable Stress */}
      <div className="tt-field">
        <div className="tt-label">
          <span>What is your biggest timetable-related stress?</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--slate-400)',
          marginBottom: 10,
          lineHeight: 1.5,
        }}>
          Describe the aspect of your current schedule that causes you the most mental strain — deadlines, class timing, workload, etc.
        </p>
        <textarea
          className="tt-textarea"
          placeholder="e.g. Having back-to-back labs on Thursdays with a submission due the same evening leaves me completely exhausted..."
          value={data.biggestStress}
          maxLength={MAX_CHARS}
          onChange={e => set('biggestStress', e.target.value)}
          rows={4}
        />
        <div className="tt-char-count">
          {data.biggestStress.length} / {MAX_CHARS} characters
        </div>
      </div>

      <hr className="tt-divider" />

      {/* Improvement Suggestions */}
      <div className="tt-field">
        <div className="tt-label">
          <span>What improvements would reduce your timetable stress?</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--slate-400)',
          marginBottom: 10,
          lineHeight: 1.5,
        }}>
          Share any specific changes to your timetable, schedule design, or workload distribution that you believe would help.
        </p>
        <textarea
          className="tt-textarea"
          placeholder="e.g. Spreading lab sessions across the week, adding a proper lunch break on Monday, and reducing the number of submissions per week..."
          value={data.improvementSuggestions}
          maxLength={MAX_CHARS}
          onChange={e => set('improvementSuggestions', e.target.value)}
          rows={4}
        />
        <div className="tt-char-count">
          {data.improvementSuggestions.length} / {MAX_CHARS} characters
        </div>
      </div>

      {/* Completion Prompt */}
      <div style={{
        marginTop: 24,
        padding: '16px 18px',
        background: 'var(--blue-50)',
        border: '1px solid var(--blue-100)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: '1.4rem' }}>🙏</span>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--blue-700)',
          margin: 0,
          lineHeight: 1.6,
        }}>
          <strong>Thank you for your reflection.</strong> Your honest feedback helps the college design a healthier, 
          more balanced academic environment for all students.
        </p>
      </div>
    </div>
  );
}