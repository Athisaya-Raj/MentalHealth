// components/teacher/MentalImpactAnalytics.jsx
// ─────────────────────────────────────────────────────────────
// Risk breakdown (Low / Moderate / High) + visual gauge.
//
// Risk logic (as specified):
//   exhaustion ≥ 8 AND workload ≥ 8  → High
//   exhaustion 5–7                    → Moderate
//   else                              → Low
//
// Props:
//   data: Array<teacherData row>
//
// TODO (backend): Replace with:
//   fetch(`/api/mental/impact?year=${year}`)
// ─────────────────────────────────────────────────────────────

import React from 'react';

// Classify a single student row
export const classifyRisk = ({ exhaustion, workload }) => {
  if (exhaustion >= 8 && workload >= 8) return 'high';
  if (exhaustion >= 5 && exhaustion <= 7) return 'moderate';
  return 'low';
};

// Compute a 0–100 composite risk score for the gauge
const computeScore = (data) => {
  if (!data.length) return 0;
  const avg = data.reduce((s, r) => s + (r.exhaustion + r.workload) / 2, 0) / data.length;
  return Math.round((avg / 10) * 100);
};

const riskLabel = (score) =>
  score < 35 ? 'LOW RISK' : score < 65 ? 'MODERATE' : 'HIGH RISK';

const riskColor = (score) =>
  score < 35 ? '#22c55e' : score < 65 ? '#f59e0b' : '#ef4444';

const MentalImpactAnalytics = ({ data = [] }) => {
  // Count by classified risk
  const counts = { low: 0, moderate: 0, high: 0 };
  data.forEach((row) => {
    counts[classifyRisk(row)]++;
  });
  const total = data.length || 1;
  const pct   = (n) => `${((n / total) * 100).toFixed(1)}%`;
  const score = computeScore(data);
  const label = riskLabel(score);
  const color = riskColor(score);

  return (
    <div className="mental-impact-grid">

      {/* Risk breakdown list */}
      <div className="t-card">
        <div className="t-card__head">
          <div className="t-card__title">Student Mental Health Risk Breakdown</div>
          <div className="t-card__subtitle">
            Computed from exhaustion + workload scores — TODO: weighted index from backend
          </div>
        </div>

        <div className="risk-indicators">
          {/* Low */}
          <div className="risk-item risk-item--low">
            <div className="risk-item__dot" />
            <span className="risk-item__label">Low Risk</span>
            <span className="risk-item__count">{counts.low}</span>
            <span className="risk-item__pct">{pct(counts.low)}</span>
          </div>

          {/* Moderate */}
          <div className="risk-item risk-item--moderate">
            <div className="risk-item__dot" />
            <span className="risk-item__label">Moderate Risk</span>
            <span className="risk-item__count">{counts.moderate}</span>
            <span className="risk-item__pct">{pct(counts.moderate)}</span>
          </div>

          {/* High */}
          <div className="risk-item risk-item--high">
            <div className="risk-item__dot" />
            <span className="risk-item__label">High Risk</span>
            <span className="risk-item__count">{counts.high}</span>
            <span className="risk-item__pct">{pct(counts.high)}</span>
          </div>
        </div>

        <div style={{
          marginTop: 14, paddingTop: 12, borderTop: '1px solid #e2e8f0',
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.76rem', color: '#94a3b8'
        }}>
          <span>Total surveyed: <strong style={{ color: '#0f172a' }}>{data.length}</strong></span>
          <span>Response rate: <strong style={{ color: '#0f172a' }}>~91%</strong></span>
        </div>
      </div>

      {/* Risk gauge */}
      <div className="t-card risk-gauge-card">
        <div className="t-card__head" style={{ textAlign: 'center' }}>
          <div className="t-card__title">Overall Risk Indicator</div>
          <div className="t-card__subtitle">
            Composite score — TODO: backend weighted algorithm
          </div>
        </div>

        {/*
         * Placeholder conic-gradient gauge.
         * TODO: Replace with an arc/semicircle chart library component
         * and bind `score` (0–100) to the needle.
         */}
        <div className="risk-gauge">
          <div className="risk-gauge__inner">
            <span className="risk-gauge__score" style={{ color }}>{score}</span>
            <span className="risk-gauge__sub">score</span>
          </div>
        </div>

        <div className="risk-gauge-meta">
          <strong style={{ color }}>{label}</strong>
          <p>
            This cohort is at <strong style={{ color }}>{label.toLowerCase()}</strong>{' '}
            mental health risk level.
          </p>
          {score >= 65 && (
            <div className="risk-alert">
              ⚠️ Action recommended — consider counselling sessions or schedule revision.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalImpactAnalytics;