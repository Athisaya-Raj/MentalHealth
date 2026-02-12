import React from 'react';
import './timetable.css';

/**
 * Module 6 — Weekly Workload Heatmap
 * Visual Mon–Fri grid with Light / Moderate / Heavy workload selectors
 */
export default function WeeklyHeatmap({ data, onUpdate }) {
  const setDay = (day, level) => {
    onUpdate('weeklyHeatmap', { ...data, [day]: level });
  };

  const days = [
    { key: 'monday',    label: 'Monday' },
    { key: 'tuesday',   label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday',  label: 'Thursday' },
    { key: 'friday',    label: 'Friday' },
  ];

  const levels = ['light', 'moderate', 'heavy'];

  const levelColors = {
    light:    { bg: '#dcfce7', text: '#15803d', dot: '#22c55e' },
    moderate: { bg: '#fef9c3', text: '#b45309', dot: '#f59e0b' },
    heavy:    { bg: '#fee2e2', text: '#b91c1c', dot: '#f87171' },
  };

  const intensityCount = {
    light:    days.filter(d => data[d.key] === 'light').length,
    moderate: days.filter(d => data[d.key] === 'moderate').length,
    heavy:    days.filter(d => data[d.key] === 'heavy').length,
  };

  return (
    <div className="tt-card">

      <div className="tt-card-header">
        <div className="tt-card-icon">🌡️</div>
        <div className="tt-card-titles">
          <h2 className="tt-card-title">Weekly Workload Heatmap</h2>
          <p className="tt-card-desc">
            Select the typical workload intensity for each day of your college week. This visualises your stress distribution across the week.
          </p>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="tt-heatmap">
        {days.map(day => (
          <div key={day.key} className="tt-heatmap-row">
            <div className="tt-heatmap-day">
              {day.label.substring(0, 3)}
              {data[day.key] && (
                <span style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: levelColors[data[day.key]]?.dot,
                  marginLeft: 6,
                  verticalAlign: 'middle',
                }} />
              )}
            </div>
            <div className="tt-heatmap-options">
              {levels.map(level => (
                <button
                  key={level}
                  className={`tt-heat-btn ${level}${data[day.key] === level ? ' active' : ''}`}
                  onClick={() => setDay(day.key, level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Chips */}
      {(intensityCount.light + intensityCount.moderate + intensityCount.heavy) > 0 && (
        <div style={{
          display: 'flex',
          gap: 10,
          marginTop: 20,
          flexWrap: 'wrap',
        }}>
          {intensityCount.light > 0 && (
            <span style={{
              padding: '6px 14px',
              borderRadius: 100,
              background: levelColors.light.bg,
              color: levelColors.light.text,
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}>
              🟢 {intensityCount.light} Light {intensityCount.light === 1 ? 'day' : 'days'}
            </span>
          )}
          {intensityCount.moderate > 0 && (
            <span style={{
              padding: '6px 14px',
              borderRadius: 100,
              background: levelColors.moderate.bg,
              color: levelColors.moderate.text,
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}>
              🟡 {intensityCount.moderate} Moderate {intensityCount.moderate === 1 ? 'day' : 'days'}
            </span>
          )}
          {intensityCount.heavy > 0 && (
            <span style={{
              padding: '6px 14px',
              borderRadius: 100,
              background: levelColors.heavy.bg,
              color: levelColors.heavy.text,
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}>
              🔴 {intensityCount.heavy} Heavy {intensityCount.heavy === 1 ? 'day' : 'days'}
            </span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="tt-heatmap-legend">
        <div className="tt-heatmap-legend-item">
          <span className="tt-legend-dot" style={{ background: '#22c55e' }} />
          Light — manageable, low stress
        </div>
        <div className="tt-heatmap-legend-item">
          <span className="tt-legend-dot" style={{ background: '#f59e0b' }} />
          Moderate — some pressure
        </div>
        <div className="tt-heatmap-legend-item">
          <span className="tt-legend-dot" style={{ background: '#f87171' }} />
          Heavy — high stress day
        </div>
      </div>
    </div>
  );
}