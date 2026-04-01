import React from 'react';
import './teacher.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'class-analytics', label: 'Class Analytics', icon: '📈' },
  { id: 'risk-detection', label: 'Risk Detection', icon: '⚠️' },
  { id: 'mentee-panel', label: 'Mentee Panel', icon: '👥' },
  { id: 'feedback-messages', label: 'Feedback & Messages', icon: '💬' },
  { id: 'academic-pressure', label: 'Academic Pressure', icon: '📚' },
  { id: 'alerts', label: 'Alerts & Notifications', icon: '🔔' },
  { id: 'trends', label: 'Well-Being Trends', icon: '📉' },
  { id: 'mentoring-notes', label: 'Mentoring Notes', icon: '📝' },
];

const TeacherSidebar = ({ activeTab, onSelectTab }) => {
  return (
    <div className="teacher-sidebar">
      <div className="teacher-sidebar__brand">
        <div className="teacher-sidebar__logo">🎓</div>
        <div className="teacher-sidebar__title">Teacher Portal</div>
      </div>
      
      <nav className="teacher-sidebar__nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`teacher-sidebar__nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            <span className="teacher-sidebar__nav-icon">{tab.icon}</span>
            <span className="teacher-sidebar__nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="teacher-sidebar__footer">
        <button className="teacher-sidebar__logout" onClick={() => {
            localStorage.removeItem("userRole");
            window.location.href = "/";
        }}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherSidebar;
