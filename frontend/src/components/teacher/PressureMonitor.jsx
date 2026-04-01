import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import './teacher.css';

const PressureMonitor = ({ data = [] }) => {
  // Mock longitudinal data for academic pressure
  const pressureData = [
    { week: 'Week 1', assignmentLoad: 3, examStress: 1, sleepLoss: 2 },
    { week: 'Week 2', assignmentLoad: 4, examStress: 2, sleepLoss: 3 },
    { week: 'Week 3', assignmentLoad: 6, examStress: 4, sleepLoss: 5 },
    { week: 'Week 4', assignmentLoad: 8, examStress: 5, sleepLoss: 7 },
    { week: 'Week 5', assignmentLoad: 9, examStress: 8, sleepLoss: 9 }, // Midterms
    { week: 'Week 6', assignmentLoad: 7, examStress: 6, sleepLoss: 6 },
    { week: 'Week 7', assignmentLoad: 5, examStress: 3, sleepLoss: 4 },
  ];

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>Academic Pressure Monitor</h3>
        <p>Monitor how academic structure (assignments, exams) affects student wellbeing over the semester.</p>
      </div>

      <div className="pressure-metrics-grid">
        <div className="metric-box">
          <h4>Current Assignment Pressure</h4>
          <span className="metric-score warning">7.5 / 10</span>
          <p>3 major submissions due this week</p>
        </div>
        <div className="metric-box">
          <h4>Exam Anxiety Level</h4>
          <span className="metric-score danger">8.2 / 10</span>
          <p>Mid-semester examinations active</p>
        </div>
        <div className="metric-box">
          <h4>Sleep Reduction</h4>
          <span className="metric-score danger">Average 5.2 hrs</span>
          <p>-1.8 hrs from baseline</p>
        </div>
      </div>

      <div className="chart-card large">
        <h4>Weekly Academic Load vs Wellbeing Impact</h4>
        <div className="chart-wrapper" style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pressureData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorAssignment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f44336" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f44336" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9c27b0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9c27b0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" />
              <YAxis />
              <RechartsTooltip />
              <Area type="monotone" dataKey="assignmentLoad" stroke="#2196f3" fillOpacity={1} fill="url(#colorAssignment)" name="Assignment Load" />
              <Area type="monotone" dataKey="examStress" stroke="#f44336" fillOpacity={1} fill="url(#colorExam)" name="Exam Stress" />
              <Area type="monotone" dataKey="sleepLoss" stroke="#9c27b0" fillOpacity={1} fill="url(#colorSleep)" name="Sleep Loss Indicator" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card large">
        <h4>Perceived Workload Across Subjects</h4>
        <div className="chart-wrapper" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={[
                { subject: 'Math', workload: 6.5 },
                { subject: 'Physics', workload: 8.2 },
                { subject: 'Chem', workload: 5.4 },
                { subject: 'CS', workload: 9.1 },
                { subject: 'Elec', workload: 7.0 },
              ]} 
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 10]} />
              <RechartsTooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="workload" name="Perceived Workload (out of 10)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default PressureMonitor;
