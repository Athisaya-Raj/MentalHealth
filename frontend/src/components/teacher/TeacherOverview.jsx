import React, { useMemo, useState, useEffect } from 'react';
import './teacher.css';

const PRIORITY_COLOR = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };

const fmtTime = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1)  return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)   return `${diffH} hour${diffH > 1 ? 's' : ''} ago`;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
};

const TeacherOverview = ({ data = [], onNavigate }) => {
  const [liveAlerts, setLiveAlerts] = useState([]);

  // Fetch live alerts from DB
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId') || 'teacher';
        const res  = await fetch(`http://localhost:5000/api/teacher/alerts?mentor_id=${teacherId}`);
        const json = await res.json();
        console.log('[TeacherOverview] Alerts data:', json);
        if (Array.isArray(json)) setLiveAlerts(json);
      } catch (err) {
        console.error('[TeacherOverview] Failed to fetch alerts:', err);
      }
    };
    fetchAlerts();
    const iv = setInterval(fetchAlerts, 30000);
    return () => clearInterval(iv);
  }, []);

  const stats = useMemo(() => {
    if (!data.length) return { avgStress: 0, highRisk: 0, helpRequests: 0 };
    let totalStress = 0, highRiskCount = 0;
    data.forEach(s => {
      totalStress += s.exhaustion;
      if (s.riskLevel === 'high') highRiskCount++;
    });
    return {
      avgStress:    (totalStress / data.length).toFixed(1),
      highRisk:     highRiskCount,
      helpRequests: liveAlerts.filter(a => a.priority === 'high').length || 2,
    };
  }, [data, liveAlerts]);

  // Fixed 3 alerts always shown in overview (no timestamp)
  const FIXED_ALERTS = [
    { _id: 'f1', studentName: 'Student #06', message: 'Too much stress due to lab', priority: 'high' },
    { _id: 'f2', studentName: 'Student #11', message: 'bjfcgeowifhceiow',           priority: 'medium' },
    { _id: 'f3', studentName: 'Student #08', message: 'Too stressed',               priority: 'high' },
  ];

  return (
    <div className="teacher-panel-container">
      <div className="kpi-grid">
        <div className="kpi-card kpi-blue">
          <div className="kpi-card-header"><h3>Average Stress Index</h3><span>🧠</span></div>
          <div className="kpi-value">{stats.avgStress} <span className="kpi-sub">/ 10</span></div>
          <p className="kpi-trend positive">Stable compared to last week</p>
        </div>

        <div className="kpi-card kpi-orange" onClick={() => onNavigate('risk-detection')} style={{ cursor: 'pointer' }}>
          <div className="kpi-card-header"><h3>High-Risk Students</h3><span>⚠️</span></div>
          <div className="kpi-value">{stats.highRisk}</div>
          <p className="kpi-trend negative">Requires attention</p>
        </div>

        <div className="kpi-card kpi-red" onClick={() => onNavigate('alerts')} style={{ cursor: 'pointer' }}>
          <div className="kpi-card-header"><h3>Urgent Help Requests</h3><span>🆘</span></div>
          <div className="kpi-value">{stats.helpRequests}</div>
          <p className="kpi-trend neutral">Immediate support needed</p>
        </div>

        <div className="kpi-card kpi-green">
          <div className="kpi-card-header"><h3>Workload Satisfaction</h3><span>📚</span></div>
          <div className="kpi-value">6.8 <span className="kpi-sub">/ 10</span></div>
          <p className="kpi-trend positive">+0.4 from mid-semester</p>
        </div>
      </div>

      <div className="overview-sections">
        {/* Live Recent Alerts */}
        <div className="overview-box recent-alerts">
          <h3>Recent Alerts</h3>
          <ul className="alert-list">
            {FIXED_ALERTS.map((alert) => (
              <li key={alert._id} className={`alert-item ${alert.priority === 'high' ? 'high-priority' : 'moderate-priority'}`}>
                <span className="dot" style={{ background: PRIORITY_COLOR[alert.priority] || '#94a3b8' }} />
                <span>
                  <strong>{alert.studentName}</strong>
                  {' — '}
                  <span style={{ color: '#475569', fontSize: '0.88rem' }}>{alert.message}</span>
                </span>
              </li>
            ))}
          </ul>
          <button className="text-btn" onClick={() => onNavigate('alerts')}>
            View All Alerts →
          </button>
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
