import React, { useState } from 'react';
import './teacher.css';

const FeedbackPanel = ({ data = [] }) => {
  const [activeTab, setActiveTab] = useState('unresolved');

  const messages = data.filter(d => d.suggestion);
  
  // Fake unresolved filter based on risk logic for demo purpose
  const displayedMessages = activeTab === 'unresolved' 
    ? messages.filter(m => m.riskLevel === 'high' || m.riskLevel === 'moderate')
    : messages;

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>Feedback & Academic Concerns</h3>
        <p>Review and act upon student feedback regarding academics and scheduling.</p>
      </div>

      <div className="feedback-tabs">
        <button 
          className={activeTab === 'unresolved' ? 'active' : ''} 
          onClick={() => setActiveTab('unresolved')}
        >
          Unresolved ({messages.filter(m => m.riskLevel !== 'low').length})
        </button>
        <button 
          className={activeTab === 'all' ? 'active' : ''} 
          onClick={() => setActiveTab('all')}
        >
          All Feedback ({messages.length})
        </button>
      </div>

      <div className="feedback-list">
        {displayedMessages.map(msg => (
          <div key={msg.id} className={`feedback-item ${msg.riskLevel}`}>
            <div className="feedback-header">
              <strong>Anonymous Feedback ({msg.year} Year - {msg.subject})</strong>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
            
            <p className="feedback-content">"{msg.suggestion}"</p>
            
            <div className="feedback-meta">
              <span>Stress Index: <strong>{msg.exhaustion}/10</strong></span>
              <span>Workload Rating: <strong>{msg.workload}/10</strong></span>
            </div>

            <div className="feedback-actions">
              <button className="primary-btn sm">Reply Directly</button>
              <button className="secondary-btn sm">Mark Resolved</button>
              <button className="danger-btn sm">Flag Issue</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPanel;
