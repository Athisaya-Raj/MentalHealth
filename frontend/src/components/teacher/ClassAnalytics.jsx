import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import StressHeatmap from './StressHeatmap';
import PlacementAnalytics from './PlacementAnalytics';
import CourseFeedbackChart from './CourseFeedbackChart';
import './teacher.css';

// ── Dummy analytics dataset keyed by "Year-Section" ─────────────────────────
const ANALYTICS_DATA = {
  'All-All': {
    label: 'All Years — All Sections',
    stressLow: 14, stressMid: 22, stressHigh: 12,
    avgScore: 3.1, avgSleep: 6.2, avgWorkload: 6.8,
    weeklyTrend: [
      { day: 'Mon', stress: 5.2 }, { day: 'Tue', stress: 6.1 },
      { day: 'Wed', stress: 7.0 }, { day: 'Thu', stress: 6.4 },
      { day: 'Fri', stress: 5.8 },
    ],
  },
  '1st-All': {
    label: '1st Year — All Sections',
    stressLow: 8, stressMid: 6, stressHigh: 2,
    avgScore: 2.8, avgSleep: 7.1, avgWorkload: 5.5,
    weeklyTrend: [
      { day: 'Mon', stress: 4.0 }, { day: 'Tue', stress: 4.8 },
      { day: 'Wed', stress: 5.5 }, { day: 'Thu', stress: 4.9 },
      { day: 'Fri', stress: 4.2 },
    ],
  },
  '1st-A': {
    label: '1st Year — Section A',
    stressLow: 5, stressMid: 3, stressHigh: 1,
    avgScore: 2.6, avgSleep: 7.4, avgWorkload: 5.0,
    weeklyTrend: [
      { day: 'Mon', stress: 3.5 }, { day: 'Tue', stress: 4.2 },
      { day: 'Wed', stress: 5.0 }, { day: 'Thu', stress: 4.5 },
      { day: 'Fri', stress: 3.8 },
    ],
  },
  '1st-B': {
    label: '1st Year — Section B',
    stressLow: 3, stressMid: 3, stressHigh: 1,
    avgScore: 3.0, avgSleep: 6.8, avgWorkload: 6.0,
    weeklyTrend: [
      { day: 'Mon', stress: 4.5 }, { day: 'Tue', stress: 5.4 },
      { day: 'Wed', stress: 6.0 }, { day: 'Thu', stress: 5.3 },
      { day: 'Fri', stress: 4.6 },
    ],
  },
  '2nd-All': {
    label: '2nd Year — All Sections',
    stressLow: 3, stressMid: 7, stressHigh: 5,
    avgScore: 3.5, avgSleep: 5.9, avgWorkload: 7.8,
    weeklyTrend: [
      { day: 'Mon', stress: 6.2 }, { day: 'Tue', stress: 7.0 },
      { day: 'Wed', stress: 8.1 }, { day: 'Thu', stress: 7.5 },
      { day: 'Fri', stress: 6.8 },
    ],
  },
  '2nd-A': {
    label: '2nd Year — Section A',
    stressLow: 2, stressMid: 4, stressHigh: 3,
    avgScore: 3.8, avgSleep: 5.6, avgWorkload: 8.2,
    weeklyTrend: [
      { day: 'Mon', stress: 6.8 }, { day: 'Tue', stress: 7.5 },
      { day: 'Wed', stress: 8.8 }, { day: 'Thu', stress: 8.0 },
      { day: 'Fri', stress: 7.2 },
    ],
  },
  '2nd-B': {
    label: '2nd Year — Section B',
    stressLow: 1, stressMid: 3, stressHigh: 2,
    avgScore: 3.2, avgSleep: 6.2, avgWorkload: 7.4,
    weeklyTrend: [
      { day: 'Mon', stress: 5.6 }, { day: 'Tue', stress: 6.5 },
      { day: 'Wed', stress: 7.4 }, { day: 'Thu', stress: 7.0 },
      { day: 'Fri', stress: 6.3 },
    ],
  },
  '3rd-All': {
    label: '3rd Year — All Sections',
    stressLow: 2, stressMid: 5, stressHigh: 3,
    avgScore: 3.3, avgSleep: 6.0, avgWorkload: 7.2,
    weeklyTrend: [
      { day: 'Mon', stress: 5.8 }, { day: 'Tue', stress: 6.4 },
      { day: 'Wed', stress: 7.2 }, { day: 'Thu', stress: 6.8 },
      { day: 'Fri', stress: 6.0 },
    ],
  },
  '3rd-A': {
    label: '3rd Year — Section A',
    stressLow: 1, stressMid: 3, stressHigh: 2,
    avgScore: 3.6, avgSleep: 5.8, avgWorkload: 7.6,
    weeklyTrend: [
      { day: 'Mon', stress: 6.2 }, { day: 'Tue', stress: 6.9 },
      { day: 'Wed', stress: 7.8 }, { day: 'Thu', stress: 7.2 },
      { day: 'Fri', stress: 6.5 },
    ],
  },
  '3rd-B': {
    label: '3rd Year — Section B',
    stressLow: 1, stressMid: 2, stressHigh: 1,
    avgScore: 3.0, avgSleep: 6.2, avgWorkload: 6.8,
    weeklyTrend: [
      { day: 'Mon', stress: 5.4 }, { day: 'Tue', stress: 5.9 },
      { day: 'Wed', stress: 6.6 }, { day: 'Thu', stress: 6.4 },
      { day: 'Fri', stress: 5.5 },
    ],
  },
  '4th-All': {
    label: '4th Year — All Sections',
    stressLow: 1, stressMid: 4, stressHigh: 2,
    avgScore: 3.4, avgSleep: 5.7, avgWorkload: 7.5,
    weeklyTrend: [
      { day: 'Mon', stress: 6.0 }, { day: 'Tue', stress: 6.8 },
      { day: 'Wed', stress: 7.5 }, { day: 'Thu', stress: 7.0 },
      { day: 'Fri', stress: 6.4 },
    ],
  },
  '4th-A': {
    label: '4th Year — Section A',
    stressLow: 1, stressMid: 2, stressHigh: 2,
    avgScore: 3.7, avgSleep: 5.5, avgWorkload: 8.0,
    weeklyTrend: [
      { day: 'Mon', stress: 6.5 }, { day: 'Tue', stress: 7.2 },
      { day: 'Wed', stress: 8.0 }, { day: 'Thu', stress: 7.6 },
      { day: 'Fri', stress: 6.9 },
    ],
  },
  '4th-B': {
    label: '4th Year — Section B',
    stressLow: 0, stressMid: 2, stressHigh: 0,
    avgScore: 3.1, avgSleep: 5.9, avgWorkload: 7.0,
    weeklyTrend: [
      { day: 'Mon', stress: 5.5 }, { day: 'Tue', stress: 6.4 },
      { day: 'Wed', stress: 7.0 }, { day: 'Thu', stress: 6.4 },
      { day: 'Fri', stress: 5.9 },
    ],
  },
};

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const ClassAnalytics = ({ data = [] }) => {
  const [selectedYear,    setSelectedYear]    = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  // Build the lookup key and resolve analytics data
  const key = `${selectedYear}-${selectedSection}`;
  const analytics = ANALYTICS_DATA[key] || ANALYTICS_DATA['All-All'];

  const stressDistribution = [
    { name: 'Low (0-4)',    value: analytics.stressLow  },
    { name: 'Moderate (5-7)', value: analytics.stressMid  },
    { name: 'High (8-10)', value: analytics.stressHigh },
  ];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedSection('All'); // reset section when year changes
  };

  return (
    <div className="teacher-panel-container">
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3>Class Well-being Analytics</h3>
          <p>
            Showing: <strong style={{ color: '#2563eb' }}>{analytics.label}</strong>
          </p>
        </div>

        <div className="hierarchical-filter">
          <select
            className="filter-dropdown"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="All">All Years</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>

          <select
            className="filter-dropdown"
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            disabled={selectedYear === 'All'}
          >
            <option value="All">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>
      </div>

      {/* KPI summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 8 }}>
        {[
          { label: 'Avg Risk Score', value: analytics.avgScore + ' / 5', color: '#ef4444' },
          { label: 'Avg Sleep (hrs)', value: analytics.avgSleep, color: '#3b82f6' },
          { label: 'Avg Workload', value: analytics.avgWorkload + ' / 10', color: '#f59e0b' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: '#fff', borderRadius: 12, padding: '14px 18px',
            border: '1px solid #f1f5f9', boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{kpi.label}</p>
            <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: kpi.color }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        {/* Stress Distribution Pie */}
        <div className="chart-card">
          <h4>Stress Level Distribution</h4>
          <p className="chart-subtext" style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 8px' }}>
            {stressDistribution.reduce((a, b) => a + b.value, 0)} students in this view
          </p>
          <div className="chart-wrapper" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stressDistribution}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={95}
                  paddingAngle={5} dataKey="value"
                >
                  {stressDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {stressDistribution.map((entry, index) => (
              <span key={entry.name} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: COLORS[index] }} />
                {entry.name}: <strong>{entry.value}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Weekly Stress Trend Bar */}
        <div className="chart-card">
          <h4>Weekly Stress Trend</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 8px' }}>Average daily stress level (1–10)</p>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.weeklyTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#64748b' }} />
                <RechartsTooltip formatter={(v) => [v.toFixed(1), 'Stress']} />
                <Bar dataKey="stress" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                  {analytics.weeklyTrend.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.stress >= 7.5 ? '#ef4444' : entry.stress >= 5.5 ? '#f59e0b' : '#22c55e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="heatmap-section">
        <StressHeatmap />
      </div>

      <div className="course-feedback-section">
        <CourseFeedbackChart />
      </div>
    </div>
  );
};

export default ClassAnalytics;
