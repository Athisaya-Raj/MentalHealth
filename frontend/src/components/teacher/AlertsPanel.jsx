import React from 'react';
import './teacher.css';

const AlertsPanel = ({ data = [] }) => {
  // Using data to generate mock alerts based on riskLevel and exhaustion
  const alerts = data.filter(d => d.riskLevel === 'high' || d.exhaustion >= 7).map((d, index) => ({
    id: `alert-${index}`,
    type: d.riskLevel === 'high' ? 'danger' : 'warning',
    student: d.studentRef,
    message: d.riskLevel === 'high' 
      ? `Critical stress level registered (${d.exhaustion}/10) alongside high workload.`
      : `Moderate risk detected. Notable exhaustion (${d.exhaustion}/10) reported.`,
    time: d.timestamp,
    resolved: false
  }));

  // Force one urgent help alert for demo
  if (alerts.length > 0) {
    alerts[0].type = 'critical';
    alerts[0].message = 'Immediate intervention needed. Student requested urgent counseling support.';
  }

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>System Alerts & Notifications</h3>
        <p>Real-time notifications triggered by student survey anomalies.</p>
      </div>

      <div className="alerts-container">
        {alerts.length === 0 && <p className="no-alerts">No active alerts at this time. Looks like everything is stable.</p>}
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-card ${alert.type}`}>
            <div className="alert-icon">
              {alert.type === 'critical' ? '🆘' : alert.type === 'danger' ? '🔴' : '🟡'}
            </div>
            <div className="alert-content">
              <h4>{alert.type === 'critical' ? 'CRITICAL ALERT' : 'System Warning'} - {alert.student}</h4>
              <p>{alert.message}</p>
              <span className="alert-timestamp">Reported: {alert.time}</span>
            </div>
            <div className="alert-actions">
              <button className="primary-btn sm">Take Action</button>
              <button className="dismiss-btn">Dismiss</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
