import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import './teacher.css';

const TrendAnalytics = ({ data = [] }) => {
  // Mock longitudinal data for wellbeing score trend
  const trendData = [
    { month: 'Aug', wellbeingScore: 8.5, burnoutIndex: 2.1, sleepDisturbance: 2.0 },
    { month: 'Sep', wellbeingScore: 7.8, burnoutIndex: 3.5, sleepDisturbance: 2.5 },
    { month: 'Oct', wellbeingScore: 6.2, burnoutIndex: 6.8, sleepDisturbance: 7.1 }, // Mid-sems
    { month: 'Nov', wellbeingScore: 6.9, burnoutIndex: 5.0, sleepDisturbance: 4.8 },
    { month: 'Dec', wellbeingScore: 8.0, burnoutIndex: 3.0, sleepDisturbance: 3.2 },
  ];

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>Well-Being Trends Over Time</h3>
        <p>Longitudinal tracking of the class's average mental wellbeing versus burnout indicators.</p>
      </div>

      <div className="chart-card large">
        <h4>Semester Wellbeing Progression</h4>
        <div className="chart-wrapper" style={{ height: 450 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" domain={[0, 10]} label={{ value: 'Wellbeing Score (Higher is Better)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} label={{ value: 'Burnout & Sleep Loss', angle: 90, position: 'insideRight' }} />
              <RechartsTooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="wellbeingScore" stroke="#4caf50" strokeWidth={3} activeDot={{ r: 8 }} name="Avg Wellbeing Score" />
              <Line yAxisId="right" type="monotone" dataKey="burnoutIndex" stroke="#f44336" strokeWidth={3} name="Burnout Index" />
              <Line yAxisId="right" type="monotone" dataKey="sleepDisturbance" stroke="#9c27b0" strokeWidth={2} strokeDasharray="5 5" name="Sleep Quality Disturbance" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="insight-box">
        <h4>💡 Key Insight</h4>
        <p>Class wellbeing drops significantly during October (Mid-Semester examinations). Proactive stress-relief workshops are recommended in late September to mitigate this inevitable drop.</p>
      </div>
    </div>
  );
};

export default TrendAnalytics;
