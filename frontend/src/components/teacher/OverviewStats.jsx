// components/teacher/OverviewStats.jsx
// ─────────────────────────────────────────────────────────────
// 5 KPI stat cards — reused for both department and year views.
//
// Props:
//   stats: {
//     avgExhaustion : number,
//     avgWorkload   : number,
//     avgBackToBack : number,
//     highStressPct : number,
//     totalResponses: number,
//   }
//
// TODO (backend): Replace dummy defaults with API response:
//   const [stats, setStats] = useState(null);
//   useEffect(() => {
//     fetch(`/api/teacher/stats?year=${year}`)
//       .then(r => r.json()).then(setStats);
//   }, [year]);
// ─────────────────────────────────────────────────────────────

import React from 'react';

const CARD_DEFS = [
  {
    key: 'avgExhaustion',
    icon: '😓',
    label: 'Avg Exhaustion',
    unit: '/ 10',
    accent: '#ef4444',
    format: (v) => v.toFixed(1),
  },
  {
    key: 'avgWorkload',
    icon: '📚',
    label: 'Avg Workload',
    unit: '/ 10',
    accent: '#f59e0b',
    format: (v) => v.toFixed(1),
  },
  {
    key: 'avgBackToBack',
    icon: '🔁',
    label: 'Avg Back-to-Back',
    unit: 'classes',
    accent: '#1a56db',
    format: (v) => v.toFixed(1),
  },
  {
    key: 'highStressPct',
    icon: '⚠️',
    label: '% High Stress',
    unit: 'students',
    accent: '#7c3aed',
    format: (v) => `${Math.round(v)}%`,
  },
  {
    key: 'totalResponses',
    icon: '✅',
    label: 'Total Responses',
    unit: 'submissions',
    accent: '#0e9f6e',
    format: (v) => v,
  },
];

const OverviewStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="overview-stats-grid">
      {CARD_DEFS.map(({ key, icon, label, unit, accent, format }) => (
        <div key={key} className="stat-card" style={{ '--sc-accent': accent }}>
          <div className="stat-card__icon">{icon}</div>
          <div className="stat-card__value">
            {format(stats[key])}
            <span className="stat-card__unit"> {unit}</span>
          </div>
          <div className="stat-card__label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStats;