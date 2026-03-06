// components/teacher/WorkloadAnalytics.jsx
// ─────────────────────────────────────────────────────────────
// Horizontal bar chart by subject + donut category breakdown.
//
// Props:
//   data: Array<teacherData row>
//
// TODO (backend): Replace with:
//   fetch(`/api/workload/analytics?year=${year}`)
// ─────────────────────────────────────────────────────────────

import React from 'react';

// Compute average workload per subject from data rows
const buildSubjectAvg = (data) => {
  const map = {};
  data.forEach(({ subject, workload }) => {
    if (!map[subject]) map[subject] = { sum: 0, count: 0 };
    map[subject].sum   += workload;
    map[subject].count += 1;
  });
  return Object.entries(map)
    .map(([subject, { sum, count }]) => ({ subject, avg: +(sum / count).toFixed(1) }))
    .sort((a, b) => b.avg - a.avg);
};

// Categorise each row: light (<5), moderate (5-7), heavy (>=8)
const buildCategories = (data) => {
  const cats = { light: 0, moderate: 0, heavy: 0 };
  data.forEach(({ workload }) => {
    if (workload >= 8)      cats.heavy++;
    else if (workload >= 5) cats.moderate++;
    else                    cats.light++;
  });
  const total = data.length || 1;
  return {
    light:    Math.round((cats.light    / total) * 100),
    moderate: Math.round((cats.moderate / total) * 100),
    heavy:    Math.round((cats.heavy    / total) * 100),
  };
};

const fillColor = (avg) =>
  avg >= 7.5 ? '#ef4444' : avg >= 5.5 ? '#f59e0b' : '#22c55e';

const WorkloadAnalytics = ({ data = [] }) => {
  const subjects   = buildSubjectAvg(data);
  const categories = buildCategories(data);

  return (
    <div className="workload-analytics-grid">

      {/* Bar chart */}
      <div className="t-card">
        <div className="t-card__head">
          <div className="t-card__title">Average Workload by Subject</div>
          <div className="t-card__subtitle">Scale 0–10 — TODO: live from survey responses API</div>
        </div>

        <div className="wa-bar-chart">
          {subjects.map(({ subject, avg }) => (
            <div key={subject} className="wa-bar-row">
              <span className="wa-bar-label">{subject}</span>
              <div className="wa-bar-track">
                <div
                  className="wa-bar-fill"
                  style={{ width: `${(avg / 10) * 100}%`, background: fillColor(avg) }}
                />
              </div>
              <span className="wa-bar-value">{avg}</span>
            </div>
          ))}

          {subjects.length === 0 && (
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No data available.</p>
          )}
        </div>
      </div>

      {/* Donut breakdown */}
      <div className="t-card">
        <div className="t-card__head">
          <div className="t-card__title">Workload Category Split</div>
          <div className="t-card__subtitle">% of students — TODO: frequency bins from backend</div>
        </div>

        <div className="wa-donut-wrap">
          {/*
           * Placeholder conic-gradient donut.
           * TODO: Replace with Recharts <PieChart> and bind `categories`
           */}
          <div className="wa-donut" />

          <div className="wa-legend">
            {[
              { label: 'Heavy (≥8)',    pct: categories.heavy,    color: '#1e3a8a' },
              { label: 'Moderate (5–7)',pct: categories.moderate, color: '#60a5fa' },
              { label: 'Light (<5)',    pct: categories.light,    color: '#bfdbfe' },
            ].map((item) => (
              <div key={item.label} className="wa-legend-item">
                <div className="wa-legend-dot" style={{ background: item.color }} />
                <span>{item.label}</span>
                <strong style={{ marginLeft: 'auto' }}>{item.pct}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadAnalytics;