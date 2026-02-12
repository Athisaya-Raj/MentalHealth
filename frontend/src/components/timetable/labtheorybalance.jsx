import React from 'react';
import './timetable.css';
import SliderField from './SliderField';

/**
 * Module 2 — Lab vs Theory Balance
 * Captures: lab/theory ratio, lab difficulty, mental fatigue after labs
 */
export default function LabTheoryBalance({ data, onUpdate }) {
  const set = (key, val) => onUpdate('labTheoryBalance', { ...data, [key]: val });

  const balanceOptions = [
    { value: 'mostly_theory',   label: '📖 Mostly Theory',      desc: '< 30% labs' },
    { value: 'balanced',        label: '⚖️ Well Balanced',       desc: '40–60% each' },
    { value: 'mostly_lab',      label: '🔬 Mostly Labs',          desc: '> 70% labs' },
    { value: 'equal',           label: '🔁 Exactly Equal',       desc: '50 / 50' },
  ];

  return (
    <div className="tt-card">

      <div className="tt-card-header">
        <div className="tt-card-icon">⚗️</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Lab & Theory Balance</h2>
          <p className="tt-card-desc">
            Help us understand the ratio of practical lab sessions vs theoretical classes, and how labs affect your mental load.
          </p>
        </div>
      </div>

      {/* Lab vs Theory Balance */}
      <div className="tt-field">
        <div className="tt-label">
          <span>Lab vs Theory Ratio in Your Timetable</span>
        </div>
        <div className="tt-radio-group">
          {balanceOptions.map(opt => (
            <div
              key={opt.value}
              className={`tt-radio-option${data.balance === opt.value ? ' selected' : ''}`}
              onClick={() => set('balance', opt.value)}
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}
            >
              <span style={{ fontWeight: 600 }}>{opt.label}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>{opt.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="tt-divider" />

      {/* Lab Difficulty Slider */}
      <SliderField
        label="Lab Difficulty Level"
        name="labDifficulty"
        value={data.labDifficulty}
        min={1}
        max={5}
        lowLabel="Easy — straightforward"
        highLabel="Very Hard — complex"
        onChange={set}
        gradient="#60a5fa, #7c3aed"
      />

      <hr className="tt-divider" />

      {/* Mental Fatigue After Labs */}
      <SliderField
        label="Mental Fatigue After Lab Sessions"
        name="mentalFatigueAfterLabs"
        value={data.mentalFatigueAfterLabs}
        min={1}
        max={5}
        lowLabel="Refreshed"
        highLabel="Mentally exhausted"
        onChange={set}
        gradient="#a5b4fc, #dc2626"
      />
    </div>
  );
}