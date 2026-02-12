import React from 'react';
import './timetable.css';

/**
 * Module 7 — Mental Impact Checklist
 * Checkbox list of stress-contributing timetable factors
 */
export default function MentalImpact({ data, onUpdate }) {
  const toggle = (key) => {
    const current = data.factors || [];
    const updated = current.includes(key)
      ? current.filter(f => f !== key)
      : [...current, key];
    onUpdate('mentalImpact', { ...data, factors: updated });
  };

  const factors = [
    {
      key: 'back_to_back_labs',
      label: 'Back-to-back lab sessions',
      desc: 'Multiple lab slots in sequence without breaks',
      icon: '🔬',
    },
    {
      key: 'no_breaks',
      label: 'No meaningful breaks',
      desc: 'Class slots that leave no recovery time',
      icon: '⏸️',
    },
    {
      key: 'surprise_reviews',
      label: 'Surprise internal reviews / vivas',
      desc: 'Unannounced or poorly scheduled evaluations',
      icon: '😨',
    },
    {
      key: 'evening_classes',
      label: 'Evening / late-afternoon classes',
      desc: 'Classes scheduled after 4 PM that drain energy',
      icon: '🌆',
    },
    {
      key: 'project_overload',
      label: 'Project overload',
      desc: 'Simultaneous project deadlines from multiple subjects',
      icon: '📦',
    },
    {
      key: 'travel_fatigue',
      label: 'Travel fatigue affecting concentration',
      desc: 'Long commutes that impact energy and focus',
      icon: '🚌',
    },
  ];

  const selectedCount = (data.factors || []).length;

  return (
    <div className="tt-card">
      <div className="tt-card-header">
        <div className="tt-card-icon">💭</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Mental Impact Factors</h2>
          <p className="tt-card-desc">
            Select all the timetable-related factors that have a notable negative impact on your mental well-being or academic performance.
          </p>
        </div>
      </div>

      {/* Selected count badge */}
      {selectedCount > 0 && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          borderRadius: 100,
          background: 'var(--blue-50)',
          border: '1px solid var(--blue-200)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--blue-700)',
          marginBottom: 20,
        }}>
          <span style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--blue-500)',
            color: 'white',
            fontSize: '0.7rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}>
            {selectedCount}
          </span>
          factor{selectedCount !== 1 ? 's' : ''} selected
        </div>
      )}

      {/* Checkbox List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {factors.map(f => {
          const isChecked = (data.factors || []).includes(f.key);
          return (
            <div
              key={f.key}
              className={`tt-checkbox-item${isChecked ? ' checked' : ''}`}
              onClick={() => toggle(f.key)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}
            >
              <div className="tt-checkbox-box">
                <span className="tt-checkbox-check">✓</span>
              </div>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{f.icon}</span>
              <div style={{ flex: 1 }}>
                <div className="tt-checkbox-label" style={{ fontWeight: 600, marginBottom: 2 }}>
                  {f.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--slate-400)',
                  lineHeight: 1.4,
                }}>
                  {f.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Summary */}
      {selectedCount >= 3 && (
        <div style={{
          marginTop: 20,
          padding: '14px 16px',
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: '#9f1239',
          lineHeight: 1.6,
        }}>
          <strong>High impact detected:</strong> You've selected {selectedCount} stress factors.
          This level of timetable-induced stress may significantly affect your academic performance and mental health.
        </div>
      )}
    </div>
  );
}