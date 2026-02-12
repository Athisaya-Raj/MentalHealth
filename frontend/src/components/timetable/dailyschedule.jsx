import React from 'react';
import './timetable.css';
import SliderField from './SliderField';

/**
 * Module 1 — Daily Schedule
 * Captures: daily exhaustion, back-to-back class count, energy after college
 */
export default function DailySchedule({ data, onUpdate }) {
  const set = (key, val) => onUpdate('dailySchedule', { ...data, [key]: val });

  return (
    <div className="tt-card">   

      <div className="tt-card-header">
        <div className="tt-card-icon">🗓️</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Daily Schedule Overview</h2>
          <p className="tt-card-desc">
            Tell us how your daily college schedule feels — including class density, energy patterns, and overall exhaustion.
          </p>
        </div>
      </div>

      {/* Daily Exhaustion Slider */}
      <SliderField
        label="Daily Exhaustion Level"
        name="exhaustionLevel"
        value={data.exhaustionLevel}
        min={1}
        max={10}
        lowLabel="Barely tired"
        highLabel="Completely drained"
        onChange={set}
        gradient="#60a5fa, #1d4ed8"
      />

      <hr className="tt-divider" />

      {/* Back-to-Back Classes Count */}
      <div className="tt-field">
        <div className="tt-label">
          <span>Back-to-Back Classes (average per day)</span>
          <span className="tt-label-value">{data.backToBackClasses}</span>
        </div>
        <div className="tt-number-input">
          <button
            className="tt-number-btn"
            onClick={() => set('backToBackClasses', Math.max(0, data.backToBackClasses - 1))}
          >−</button>
          <div className="tt-number-display">{data.backToBackClasses}</div>
          <button
            className="tt-number-btn"
            onClick={() => set('backToBackClasses', Math.min(12, data.backToBackClasses + 1))}
          >+</button>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--slate-400)', marginLeft: 8 }}>
            {data.backToBackClasses === 0 ? 'None' : data.backToBackClasses <= 2 ? 'Manageable' : data.backToBackClasses <= 4 ? 'Hectic' : 'Overwhelming'}
          </span>
        </div>
      </div>

      <hr className="tt-divider" />

      {/* Energy After College */}
      <div className="tt-field">
        <div className="tt-label">
          <span>Energy Level After College</span>
        </div>
        <div className="tt-radio-group">
          {[
            { value: 'high',    label: '⚡ High — Still energetic' },
            { value: 'medium',  label: '😐 Medium — Somewhat tired' },
            { value: 'low',     label: '😩 Low — Very drained' },
            { value: 'varying', label: '🔄 Varies by day' },
          ].map(opt => (
            <div
              key={opt.value}
              className={`tt-radio-option${data.energyAfterCollege === opt.value ? ' selected' : ''}`}
              onClick={() => set('energyAfterCollege', opt.value)}
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