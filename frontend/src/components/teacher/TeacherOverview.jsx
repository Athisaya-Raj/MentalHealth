import React, { useMemo } from 'react';
import './teacher.css';

const TeacherOverview = ({ data = [], onNavigate }) => {
  // Compute some quick stats
  const stats = useMemo(() => {
    if (!data.length) return { avgStress: 0, highRisk: 0, helpRequests: 0 };
    
    let totalStress = 0;
    let highRiskCount = 0;
    
    data.forEach(student => {
      totalStress += student.exhaustion;
      if (student.riskLevel === 'high') highRiskCount++;
    });

    return {
      avgStress: (totalStress / data.length).toFixed(1),
      highRisk: highRiskCount,
      helpRequests: data.filter(s => s.suggestion && s.suggestion.toLowerCase().includes('help')).length
    };
  }, [data]);

  return (
    <div className="teacher-panel-container">
      <div className="kpi-grid">
        <div className="kpi-card kpi-blue">
          <div className="kpi-card-header">
            <h3>Average Stress Index</h3>
            <span>🧠</span>
          </div>
          <div className="kpi-value">{stats.avgStress} <span className="kpi-sub">/ 10</span></div>
          <p className="kpi-trend positive">Stable compared to last week</p>
        </div>
        
        <div className="kpi-card kpi-orange" onClick={() => onNavigate('risk-detection')}>
          <div className="kpi-card-header">
            <h3>High-Risk Students</h3>
            <span>⚠️</span>
          </div>
          <div className="kpi-value">{stats.highRisk}</div>
          <p className="kpi-trend negative">Requires attention</p>
        </div>

        <div className="kpi-card kpi-red">
          <div className="kpi-card-header">
            <h3>Urgent Help Requests</h3>
            <span>🆘</span>
          </div>
          <div className="kpi-value">{stats.helpRequests || 2}</div>
          <p className="kpi-trend neutral">Immediate support needed</p>
        </div>

        <div className="kpi-card kpi-green">
          <div className="kpi-card-header">
            <h3>Workload Satisfaction</h3>
            <span>📚</span>
          </div>
          <div className="kpi-value">6.8 <span className="kpi-sub">/ 10</span></div>
          <p className="kpi-trend positive">+0.4 from mid-semester</p>
        </div>
      </div>

      <div className="overview-sections">
        <div className="overview-box recent-alerts">
          <h3>Recent Alerts</h3>
          <ul className="alert-list">
            <li className="alert-item high-priority">
              <span className="dot red"></span>
              <strong>Student #05</strong> reporting extreme lab workload clustering
              <span className="alert-time">1 hour ago</span>
            </li>
            <li className="alert-item high-priority">
              <span className="dot red"></span>
              <strong>Student #06</strong> struggling with sleep due to upcoming assignments
              <span className="alert-time">3 hours ago</span>
            </li>
            <li className="alert-item moderate-priority">
              <span className="dot yellow"></span>
              <strong>Student #09</strong> highlighted project and mid-sem clash
              <span className="alert-time">4 hours ago</span>
            </li>
          </ul>
          <button className="text-btn" onClick={() => onNavigate('alerts')}>View All Alerts</button>
        </div>

        <div className="overview-box quick-links">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <button className="action-btn" onClick={() => onNavigate('mentee-panel')}>👥 Review Mentees</button>
            <button className="action-btn" onClick={() => onNavigate('feedback-messages')}>💬 Check Messages</button>
            <button className="action-btn" onClick={() => onNavigate('academic-pressure')}>📉 Academic Load</button>
            <button className="action-btn" onClick={() => onNavigate('class-analytics')}>📊 Analytics</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
