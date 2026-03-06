// components/teacher/YearAnalytics.jsx
// ─────────────────────────────────────────────────────────────
// Year-specific detailed analytics view.
// Reuses all existing analytics modules, filtered by year.
//
// Props:
//   year         : string  — "1st" | "2nd" | "3rd" | "4th"
//   data         : Array<teacherData row>  — already filtered to this year
//   onBack       : fn() => void  — returns to department overview
//
// TODO (backend): Replace `data` with a per-year API call:
//   fetch(`/api/teacher/year?year=${year}`)
// ─────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import OverviewStats         from './OverviewStats';
import TimetableAnalytics    from './TimetableAnalytics';
import WorkloadAnalytics     from './WorkloadAnalytics';
import MentalImpactAnalytics from './MentalImpactAnalytics';
import SuggestionsPanel      from './SuggestionsPanel';
import { classifyRisk }      from './MentalImpactAnalytics';

const YEAR_COLORS = {
  '1st': '#22c55e',
  '2nd': '#ef4444',
  '3rd': '#3b82f6',
  '4th': '#f59e0b',
};

const YEAR_LABELS = {
  '1st': 'First Year',
  '2nd': 'Second Year',
  '3rd': 'Third Year',
  '4th': 'Final Year',
};

// Section wrapper
const Section = ({ title, children }) => (
  <div>
    <div className="t-section-label">
      <h2>{title}</h2>
      <div className="t-section-label__line" />
    </div>
    {children}
  </div>
);

const YearAnalytics = ({ year, data = [], onBack }) => {
  // Compute OverviewStats props from filtered data
  const stats = useMemo(() => {
    if (!data.length) return null;
    const n            = data.length;
    const avgExhaustion = +(data.reduce((s, r) => s + r.exhaustion, 0) / n).toFixed(1);
    const avgWorkload   = +(data.reduce((s, r) => s + r.workload,   0) / n).toFixed(1);
    const avgBackToBack = +(data.reduce((s, r) => s + r.backToBack, 0) / n).toFixed(1);
    const highCount     = data.filter((r) => classifyRisk(r) === 'high').length;
    const highStressPct = +((highCount / n) * 100).toFixed(1);
    return { avgExhaustion, avgWorkload, avgBackToBack, highStressPct, totalResponses: n };
  }, [data]);

  const color = YEAR_COLORS[year] || '#1a56db';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Back button */}
      <button className="year-analytics__back-btn" onClick={onBack}>
        ← Back to Department Overview
      </button>

      {/* Hero banner */}
      <div className="year-analytics__hero">
        <div>
          <div className="year-analytics__hero-title">
            {year} Year – Detailed Analysis
          </div>
          <div className="year-analytics__hero-sub">
            {YEAR_LABELS[year]} · {data.length} responses · UG Department
          </div>
        </div>
        <div className="year-analytics__hero-badge">
          <strong>{data.length}</strong>
          <span>Total Responses</span>
        </div>
      </div>

      {/* 1. Overview Stats */}
      <Section title="KPI Overview">
        <OverviewStats stats={stats} />
      </Section>

      {/* 2. Timetable Analytics */}
      <Section title="Timetable Analytics">
        <TimetableAnalytics data={data} />
      </Section>

      {/* 3. Workload Analytics */}
      <Section title="Workload Analytics">
        <WorkloadAnalytics data={data} />
      </Section>

      {/* 4. Mental Impact */}
      <Section title="Mental Health Impact">
        <MentalImpactAnalytics data={data} />
      </Section>

      {/* 5. Suggestions */}
      <Section title="Student Feedback & Suggestions">
        <SuggestionsPanel data={data} />
      </Section>
    </div>
  );
};

export default YearAnalytics;