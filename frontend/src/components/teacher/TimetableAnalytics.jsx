// components/teacher/TimetableAnalytics.jsx
// ─────────────────────────────────────────────────────────────
// Heatmap (period × day) and ranked busiest-slots list.
// Accepts year-filtered or dept-level data.
//
// Props:
//   data: Array<teacherData row>   — filtered by year or full set
//
// TODO (backend): Replace with:
//   fetch(`/api/timetable/analytics?year=${year}`)
// ─────────────────────────────────────────────────────────────

import React from 'react';

const DAYS    = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const PERIODS = ['P 1', 'P 2', 'P 3', 'P 4'];

// Derive heatmap values from backToBack scores (mock distribution)
const buildHeatmap = (data) => {
  if (!data.length) return Array(4).fill(Array(5).fill(0));
  const avg = data.reduce((s, r) => s + r.backToBack, 0) / data.length;
  // Spread avg across cells with slight noise for visual variety
  return PERIODS.map((_, pi) =>
    DAYS.map((__, di) => {
      const noise = ((pi + di * 3) % 3) - 1;
      return Math.min(4, Math.max(0, Math.round(avg + noise)));
    })
  );
};

const buildBusiest = (data) => {
  // Use backToBack as a proxy for slot density
  const sorted = [...data].sort((a, b) => b.backToBack - a.backToBack);
  const top = sorted.slice(0, 5);
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return top.map((r, i) => ({
    label: `${dayLabels[i % 5]} · Period ${(i % 4) + 1}`,
    count: r.backToBack * 4 + 10, // mock student count derived from data
  }));
};

const TimetableAnalytics = ({ data = [] }) => {
  const heatmap  = buildHeatmap(data);
  const busiest  = buildBusiest(data);

  return (
    <div className="timetable-analytics-grid">

      {/* Heatmap card */}
      <div className="t-card">
        <div className="t-card__head">
          <div className="t-card__title">Class Load Heatmap</div>
          <div className="t-card__subtitle">
            Back-to-back intensity by day & period —{' '}
            <em>TODO: replace with live slot data from backend</em>
          </div>
        </div>

        <div className="ta-heatmap-grid">
          {/* Column headers */}
          <div />
          {DAYS.map((d) => (
            <div key={d} className="ta-heatmap-header">{d}</div>
          ))}

          {/* Data rows */}
          {PERIODS.map((period, ri) => (
            <React.Fragment key={period}>
              <div className="ta-heatmap-label">{period}</div>
              {heatmap[ri].map((val, ci) => (
                <div
                  key={ci}
                  className={`ta-heatmap-cell heat-${val}`}
                  title={`${DAYS[ci]} ${period}: intensity ${val}`}
                >
                  {val}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div className="ta-legend">
          <span>Low</span>
          {[0, 1, 2, 3, 4].map((h) => (
            <div key={h} className={`ta-legend-swatch heat-${h}`} />
          ))}
          <span>High</span>
        </div>
      </div>

      {/* Busiest slots */}
      <div className="t-card">
        <div className="t-card__head">
          <div className="t-card__title">Busiest Time Slots</div>
          <div className="t-card__subtitle">Ranked by student load — TODO: backend query</div>
        </div>

        <ul className="ta-busy-list">
          {busiest.map((slot, i) => (
            <li key={i} className="ta-busy-item">
              <span>
                <span className="ta-busy-item__rank">#{i + 1}</span>
                <span className="ta-busy-item__label">{slot.label}</span>
              </span>
              <span className="ta-busy-item__count">{slot.count} students</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimetableAnalytics;