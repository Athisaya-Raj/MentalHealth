import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import './teacher.css';

const CourseFeedbackChart = () => {
  // Mock data for Course Feedback
  const courseData = [
    { subject: 'Math', difficulty: 7, teachingSatisfied: 8, fairness: 9 },
    { subject: 'Physics', difficulty: 9, teachingSatisfied: 6, fairness: 5 },
    { subject: 'Chem', difficulty: 6, teachingSatisfied: 7, fairness: 8 },
    { subject: 'CS', difficulty: 8, teachingSatisfied: 9, fairness: 7 },
    { subject: 'Elec', difficulty: 7, teachingSatisfied: 5, fairness: 6 },
  ];

  return (
    <div className="chart-card large">
      <h4>Course-wise Feedback Analytics</h4>
      <p className="chart-subtext">Aggregated student ratings (Out of 10) on difficulty, teaching clarity, and workload fairness.</p>
      <div className="chart-wrapper" style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={courseData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 10]} />
            <RechartsTooltip cursor={{ fill: '#f1f5f9' }} />
            <Legend />
            <Bar dataKey="difficulty" name="Course Difficulty" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="teachingSatisfied" name="Teaching Satisfaction" fill="#4caf50" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fairness" name="Workload Fairness" fill="#2196f3" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseFeedbackChart;
