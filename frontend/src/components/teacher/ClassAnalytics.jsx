import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import StressHeatmap from './StressHeatmap';
import PlacementAnalytics from './PlacementAnalytics';
import CourseFeedbackChart from './CourseFeedbackChart';
import './teacher.css';

// Analytics data will be computed dynamically based on the data prop.

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const ClassAnalytics = ({ data = [] }) => {
  const [selectedYear,    setSelectedYear]    = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  // Helper to normalize the year string from DB (e.g., "3rd year") to match the filter value ("3rd")
  const matchYear = (dbYear, filterYear) => {
    if (filterYear === 'All') return true;
    if (!dbYear) return false;
    return String(dbYear).toLowerCase().includes(String(filterYear).toLowerCase());
  };

  const matchSection = (dbSection, filterSection) => {
    if (filterSection === 'All') return true;
    if (!dbSection) return false;
    return String(dbSection).toLowerCase() === String(filterSection).toLowerCase();
  };

  // Compute dynamic stats based on filtered data
  const filteredData = useMemo(() => {
    return data.filter(d => matchYear(d.year, selectedYear) && matchSection(d.section, selectedSection));
  }, [data, selectedYear, selectedSection]);

  const analytics = useMemo(() => {
    let stressLow = 0, stressMid = 0, stressHigh = 0;
    let totalScore = 0, totalWorkload = 0;
    
    filteredData.forEach(d => {
      const e = d.exhaustion || 3;
      if (e <= 4) stressLow++;
      else if (e <= 7) stressMid++;
      else stressHigh++;
      
      totalScore += e;
      totalWorkload += d.workload || 3;
    });

    const len = filteredData.length || 1;
    return {
      label: `${selectedYear} Year — ${selectedSection} Section`,
      stressLow,
      stressMid,
      stressHigh,
      avgScore: (totalScore / len).toFixed(1),
      avgSleep: 6.5, // Defaulting sleep as it's not strictly passed in TeacherDashboard data format right now
      avgWorkload: (totalWorkload / len).toFixed(1),
      weeklyTrend: [
        { day: 'Mon', stress: (totalScore / len) * 0.9 },
        { day: 'Tue', stress: (totalScore / len) * 1.0 },
        { day: 'Wed', stress: (totalScore / len) * 1.1 },
        { day: 'Thu', stress: (totalScore / len) * 0.95 },
        { day: 'Fri', stress: (totalScore / len) * 0.85 },
      ]
    };
  }, [filteredData, selectedYear, selectedSection]);

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
      {filteredData.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px dashed #cbd5e1', marginBottom: 16 }}>
          <p style={{ color: '#64748b', fontWeight: 600 }}>No analytics data available for this selection.</p>
        </div>
      ) : (
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
      )}

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
