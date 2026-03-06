// components/teacher/DepartmentOverview.jsx
// ─────────────────────────────────────────────────────────────
// Default "all years" view:
//   • 5 KPI cards (top strip)
//   • Year comparison bar chart
//   • 4 clickable Year Cards
//
// Props:
//   allData       : Array<teacherData row>   — full dataset
//   onSelectYear  : fn(year: string) => void — navigate to detail
//
// TODO (backend): Replace allData with:
//   fetch('/api/teacher/department-overview').then(r => r.json())
// ─────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { classifyRisk } from './MentalImpactAnalytics';

const YEARS = ['1st', '2nd', '3rd', '4th'];

// Color per year
const YEAR_COLORS = {
  '1st': '#22c55e',
  '2nd': '#ef4444',
  '3rd': '#3b82f6',
  '4th': '#f59e0b',
};

// Compute aggregated stats for one year's data slice
const computeYearStats = (rows) => {
  if (!rows.length) return null;
  const n            = rows.length;
  const avgExhaustion = +(rows.reduce((s, r) => s + r.exhaustion, 0) / n).toFixed(1);
  const avgWorkload   = +(rows.reduce((s, r) => s + r.workload,   0) / n).toFixed(1);
  const avgBackToBack = +(rows.reduce((s, r) => s + r.backToBack, 0) / n).toFixed(1);
  const highCount     = rows.filter((r) => classifyRisk(r) === 'high').length;
  const highStressPct = +((highCount / n) * 100).toFixed(1);

  // Dominant risk: majority class
  const riskCounts = { low: 0, moderate: 0, high: 0 };
  rows.forEach((r) => { riskCounts[classifyRisk(r)]++; });
  const dominantRisk = Object.entries(riskCounts).sort((a, b) => b[1] - a[1])[0][0];

  return { avgExhaustion, avgWorkload, avgBackToBack, highStressPct, totalResponses: n, dominantRisk };
};

// ── Sub-components ──────────────────────────────────────────

const KPIStrip = ({ stats, highestYear, lowestYear }) => {
  const kpis = [
    { icon: '😓', label: 'Overall Avg Exhaustion', value: `${stats.avgExhaustion}`, unit: '/ 10', accent: '#ef4444' },
    { icon: '📚', label: 'Overall Avg Workload',   value: `${stats.avgWorkload}`,   unit: '/ 10', accent: '#f59e0b' },
    { icon: '✅', label: 'Total Responses',         value: stats.totalResponses,     unit: 'students', accent: '#0e9f6e' },
    { icon: '📈', label: 'Highest Stress Year',     value: `${highestYear} Year`,   unit: '', accent: '#ef4444',
      tag: { text: 'Critical', bg: '#fef2f2', color: '#ef4444' } },
    { icon: '📉', label: 'Lowest Stress Year',      value: `${lowestYear} Year`,    unit: '', accent: '#22c55e',
      tag: { text: 'Stable',   bg: '#ecfdf5', color: '#0e9f6e' } },
  ];

  return (
    <div className="dept-kpi-strip">
      {kpis.map((k) => (
        <div key={k.label} className="dept-kpi-card" style={{ '--kpi-accent': k.accent }}>
          <div className="dept-kpi-card__icon">{k.icon}</div>
          <div className="dept-kpi-card__value">
            {k.value}
            {k.unit && <span> {k.unit}</span>}
          </div>
          <div className="dept-kpi-card__label">{k.label}</div>
          {k.tag && (
            <span className="dept-kpi-card__tag" style={{ background: k.tag.bg, color: k.tag.color }}>
              {k.tag.text}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

const YearComparisonChart = ({ yearStats }) => (
  <div className="t-card">
    <div className="t-card__head">
      <div className="t-card__title">Year-wise Comparison</div>
      <div className="t-card__subtitle">
        Exhaustion & Workload averages per year — TODO: replace with live bar chart (Recharts)
      </div>
    </div>

    <div className="year-bar-chart">
      {YEARS.map((yr) => {
        const s = yearStats[yr];
        if (!s) return null;
        const color = YEAR_COLORS[yr];
        return (
          <div key={yr} className="year-bar-row">
            <span className="year-bar-row__label">{yr} Year</span>
            <div className="year-bar-row__tracks">
              {/* Exhaustion bar */}
              <div className="year-bar-track" title={`Exhaustion: ${s.avgExhaustion}`}>
                <div
                  className="year-bar-fill"
                  style={{ width: `${(s.avgExhaustion / 10) * 100}%`, background: color, opacity: 1 }}
                />
              </div>
              {/* Workload bar */}
              <div className="year-bar-track" title={`Workload: ${s.avgWorkload}`}>
                <div
                  className="year-bar-fill"
                  style={{ width: `${(s.avgWorkload / 10) * 100}%`, background: color, opacity: 0.45 }}
                />
              </div>
            </div>
            <div className="year-bar-row__meta">
              <strong>{s.avgExhaustion} <span>exh</span></strong>
              <span>{s.avgWorkload} wkl</span>
            </div>
          </div>
        );
      })}
    </div>

    {/* Legend */}
    <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.73rem', color: '#64748b' }}>
        <div style={{ width: 24, height: 8, background: '#64748b', borderRadius: 4 }} />
        Exhaustion (darker)
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.73rem', color: '#94a3b8' }}>
        <div style={{ width: 24, height: 8, background: '#94a3b8', borderRadius: 4 }} />
        Workload (lighter)
      </div>
    </div>
  </div>
);

const YearCards = ({ yearStats, onSelectYear }) => (
  <div className="year-cards-grid">
    {YEARS.map((yr) => {
      const s = yearStats[yr];
      if (!s) return null;
      const color = YEAR_COLORS[yr];
      return (
        <div
          key={yr}
          className="year-card"
          style={{ '--yc-color': color }}
          onClick={() => onSelectYear(yr)}
        >
          <div className="year-card__header">
            <span className="year-card__title">{yr} Year</span>
            <span className="year-card__arrow">→</span>
          </div>

          <div className="year-card__stats">
            <div className="year-card__stat-row">
              <span className="year-card__stat-label">Avg Exhaustion</span>
              <span className="year-card__stat-value">{s.avgExhaustion} / 10</span>
            </div>
            <div className="year-card__stat-row">
              <span className="year-card__stat-label">Avg Workload</span>
              <span className="year-card__stat-value">{s.avgWorkload} / 10</span>
            </div>
            <div className="year-card__stat-row">
              <span className="year-card__stat-label">High Stress %</span>
              <span className="year-card__stat-value">{s.highStressPct}%</span>
            </div>
            <div className="year-card__stat-row">
              <span className="year-card__stat-label">Risk Level</span>
              <span className={`risk-pill risk-pill--${s.dominantRisk}`}>
                <span className={`risk-dot risk-dot--${s.dominantRisk}`} />
                {s.dominantRisk.charAt(0).toUpperCase() + s.dominantRisk.slice(1)}
              </span>
            </div>
          </div>

          <div className="year-card__responses">
            {s.totalResponses} responses collected · Click to view details →
          </div>
        </div>
      );
    })}
  </div>
);

// ── Main Component ──────────────────────────────────────────

const DepartmentOverview = ({ allData = [], onSelectYear }) => {
  // Group data by year
  const byYear = useMemo(() => {
    const groups = {};
    YEARS.forEach((yr) => { groups[yr] = allData.filter((r) => r.year === yr); });
    return groups;
  }, [allData]);

  // Compute per-year stats
  const yearStats = useMemo(() => {
    const result = {};
    YEARS.forEach((yr) => { result[yr] = computeYearStats(byYear[yr]); });
    return result;
  }, [byYear]);

  // Department-level aggregates
  const deptStats = useMemo(() => computeYearStats(allData), [allData]);

  // Highest / Lowest stress year
  const { highestYear, lowestYear } = useMemo(() => {
    const ranked = YEARS
      .filter((yr) => yearStats[yr])
      .sort((a, b) => yearStats[b].avgExhaustion - yearStats[a].avgExhaustion);
    return { highestYear: ranked[0] || '—', lowestYear: ranked[ranked.length - 1] || '—' };
  }, [yearStats]);

  // Build summaries for BatchSelector badge counts
  // (exported via onSummaries prop if needed — parent uses yearStats directly)

  if (!deptStats) return <p style={{ color: '#94a3b8', padding: 24 }}>No data loaded.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* KPI Strip */}
      <div>
        <div className="t-section-label">
          <h2>Department KPIs</h2>
          <div className="t-section-label__line" />
        </div>
        <KPIStrip stats={deptStats} highestYear={highestYear} lowestYear={lowestYear} />
      </div>

      {/* Year comparison chart */}
      <div>
        <div className="t-section-label">
          <h2>Year Comparison</h2>
          <div className="t-section-label__line" />
        </div>
        <YearComparisonChart yearStats={yearStats} />
      </div>

      {/* Clickable year cards */}
      <div>
        <div className="t-section-label">
          <h2>Select a Year for Detailed Analytics</h2>
          <div className="t-section-label__line" />
        </div>
        <YearCards yearStats={yearStats} onSelectYear={onSelectYear} />
      </div>
    </div>
  );
};

export default DepartmentOverview;