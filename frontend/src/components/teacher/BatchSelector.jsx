// components/teacher/BatchSelector.jsx
// ─────────────────────────────────────────────────────────────
// Tab-style year/batch switcher at the top of the dashboard.
//
// Props:
//   selectedYear  : string  — "all" | "1st" | "2nd" | "3rd" | "4th"
//   onSelectYear  : fn(year: string) => void
//   yearSummaries : Array<{ year, riskLevel, responses }>
//     → computed by parent from teacherData.json
// ─────────────────────────────────────────────────────────────

import React from 'react';

const YEARS = ['1st', '2nd', '3rd', '4th'];

const BatchSelector = ({ selectedYear, onSelectYear, yearSummaries = [] }) => {
  // Build a lookup: { '1st': { riskLevel, responses }, ... }
  const lookup = yearSummaries.reduce((acc, s) => {
    acc[s.year] = s;
    return acc;
  }, {});

  return (
    <nav className="batch-selector">
      {/* Department overview tab */}
      <button
        className={`batch-selector__tab${selectedYear === 'all' ? ' batch-selector__tab--active' : ''}`}
        onClick={() => onSelectYear('all')}
      >
        🏛 Department Overview
      </button>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} />

      {/* Year tabs */}
      {YEARS.map((yr) => {
        const info = lookup[yr];
        const isHigh = info?.riskLevel === 'high';
        return (
          <button
            key={yr}
            className={`batch-selector__tab${selectedYear === yr ? ' batch-selector__tab--active' : ''}`}
            onClick={() => onSelectYear(yr)}
          >
            {yr} Year
            {info && (
              <span className={`batch-selector__badge${isHigh ? ' batch-selector__badge--high' : ''}`}>
                {info.responses}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BatchSelector;