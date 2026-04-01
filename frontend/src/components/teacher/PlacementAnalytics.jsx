import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import './teacher.css';

const PlacementAnalytics = () => {
  const placementAnxietyData = [
    { name: 'Low Anxiety', value: 15 },
    { name: 'Moderate Anxiety', value: 35 },
    { name: 'High Anxiety', value: 50 },
  ];
  const COLORS = ['#4caf50', '#ffb300', '#d32f2f'];

  return (
    <div className="chart-card">
      <h4>Placement & Internship Anxiety</h4>
      <p className="chart-subtext">Student anxiety regarding upcoming placements</p>
      <div className="chart-wrapper" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={placementAnxietyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {placementAnxietyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend">
        {placementAnxietyData.map((entry, index) => (
          <span key={entry.name} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: COLORS[index] }}></span>
            {entry.name}: {entry.value}%
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlacementAnalytics;
