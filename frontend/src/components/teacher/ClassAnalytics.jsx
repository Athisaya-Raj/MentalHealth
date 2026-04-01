import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import StressHeatmap from './StressHeatmap';
import PlacementAnalytics from './PlacementAnalytics';
import CourseFeedbackChart from './CourseFeedbackChart';
import './teacher.css';

const ClassAnalytics = ({ data = [] }) => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  // Filtering Logic (Mock implementation since standard JSON might not have exact fields, but handles UI requirements)
  const filteredData = data.filter(d => {
    let yearMatch = selectedYear === 'All' || d.year === selectedYear;
    // Assume if no section field exists in mock data, we just return true for section match if "All"
    // otherwise filter would be d.section === selectedSection
    let sectionMatch = selectedSection === 'All'; 
    return yearMatch && sectionMatch;
  });

  const stressDistribution = [
    { name: 'Low (0-4)', value: filteredData.filter(d => d.exhaustion <= 4).length || 5 },
    { name: 'Moderate (5-7)', value: filteredData.filter(d => d.exhaustion > 4 && d.exhaustion <= 7).length || 8 },
    { name: 'High (8-10)', value: filteredData.filter(d => d.exhaustion >= 8).length || 4 },
  ];
  const COLORS = ['#4caf50', '#ff9800', '#f44336'];

  return (
    <div className="teacher-panel-container">
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>Class Well-being Analytics</h3>
          <p>Visual breakdown of class stress, workload, and feedback.</p>
        </div>
        
        <div className="hierarchical-filter">
          <select 
            className="filter-dropdown" 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
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
            onChange={(e) => setSelectedSection(e.target.value)}
            disabled={selectedYear === 'All'}
          >
            <option value="All">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>
      </div>

      <div className="charts-grid">
        {/* Stress Distribution Bubble */}
        <div className="chart-card">
          <h4>Stress Level Distribution</h4>
          <p className="chart-subtext">Overall student mental strain</p>
          <div className="chart-wrapper" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stressDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stressDistribution.map((entry, index) => (
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
                <span className="legend-color" style={{ backgroundColor: COLORS[index] }}></span>
                {entry.name}: {entry.value}
              </span>
            ))}
          </div>
        </div>

        {/* Placement Stress Analytics */}
        <PlacementAnalytics />
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
