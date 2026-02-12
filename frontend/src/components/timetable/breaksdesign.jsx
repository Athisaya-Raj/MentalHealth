import React from 'react';
import './timetable.css';
import SliderField from './SliderField';

/**
 * Module 5 — Breaks & Schedule Design
 * Captures: break sufficiency, lunch timing rating, long gap frustration, early morning fatigue
 */
export default function BreaksDesign({ data, onUpdate }) {
  const set = (key, val) => onUpdate('breaksDesign', { ...data, [key]: val });

  const lunchTimings = [
    { value: 'early',      label: '⏰ Early (before 12 pm)' },
    { value: 'standard',   label: '🕛 Standard (12–1 pm)' },
    { value: 'late',       label: '🕑 Late (after 2 pm)' },
    { value: 'no_break',   label: '🚫 No proper lunch break' },
  ];

  return (
    <div className="tt-card">

      <div className="tt-card-header">
        <div className="tt-card-icon">🛋️</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Breaks & Schedule Design</h2>
          <p className="tt-card-desc">
            Evaluate the quality and distribution of breaks throughout your timetable — including lunch, free periods, and early starts.
          </p>
        </div>
      </div>

      {/* Break Sufficiency */}
      <SliderField
        label="Break Sufficiency Throughout the Day"
        name="breakSufficiency"
        value={data.breakSufficiency}
        min={1}
        max={5}
        lowLabel="No real breaks"
        highLabel="Well-spaced breaks"
        onChange={set}
        gradient="#fbbf24, #22c55e"
      />

      <hr className="tt-divider" />

      {/* Lunch Timing */}
      <div className="tt-field">
        <div className="tt-label">
          <span>Lunch Break Timing in Timetable</span>
        </div>
        <div className="tt-radio-group">
          {lunchTimings.map(opt => (
            <div
              key={opt.value}
              className={`tt-radio-option${data.lunchTimingRating === opt.value ? ' selected' : ''}`}
              onClick={() => set('lunchTimingRating', opt.value)}
            >
              <span className="tt-radio-dot" />
              {opt.label}
            </div>
          ))}
        </div>
        {data.lunchTimingRating === 'no_break' && (
          <p style={{
            marginTop: 10,
            padding: '10px 14px',
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: '#c2410c',
          }}>
            ⚠️ Skipping a dedicated lunch break is associated with increased fatigue and reduced focus in afternoon sessions.
          </p>
        )}
      </div>

      <hr className="tt-divider" />

      {/* Long Gaps Frustration */}
      <SliderField
        label="Frustration from Long Unproductive Gaps"
        name="longGapsFrustration"
        value={data.longGapsFrustration}
        min={1}
        max={5}
        lowLabel="Not bothered"
        highLabel="Highly frustrating"
        onChange={set}
        gradient="#a5b4fc, #f87171"
      />

      <hr className="tt-divider" />

      {/* Early Morning Fatigue */}
      <SliderField
        label="Early Morning Class Fatigue"
        name="earlyMorningFatigue"
        value={data.earlyMorningFatigue}
        min={1}
        max={5}
        lowLabel="No problem at all"
        highLabel="Extremely difficult"
        onChange={set}
        gradient="#93c5fd, #7c3aed"
      />
    </div>
  );
}