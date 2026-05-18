import React, { useState } from 'react';
import './teacher.css';

const FeedbackPanel = ({ data = [] }) => {
  const [activeTab, setActiveTab]   = useState('unresolved');
  const [resolved, setResolved]     = useState(new Set());
  const [flagged, setFlagged]       = useState(new Set());

  const messages = data.filter(d => d.suggestion);

  const displayedMessages = activeTab === 'unresolved'
    ? messages.filter(m => m.riskLevel === 'high' || m.riskLevel === 'moderate')
    : messages;

  const handleResolve = async (id) => {
    setResolved(prev => new Set([...prev, id]));
    // Optional backend update
    try {
      await fetch(`http://localhost:5000/api/feedback/${id}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      });
    } catch (_) { /* non-critical — UI already updated */ }
  };

  const handleFlag = async (id) => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    // Optional backend update
    try {
      await fetch(`http://localhost:5000/api/feedback/${id}/flag`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flagged: !flagged.has(id) }),
      });
    } catch (_) { /* non-critical */ }
  };

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>Feedback &amp; Academic Concerns</h3>
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
        {displayedMessages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
            No student feedback submitted yet.
          </p>
        ) : (
          displayedMessages.map(msg => {
            const isResolved = resolved.has(msg.id);
            const isFlagged  = flagged.has(msg.id);

            return (
              <div
                key={msg.id}
                className={`feedback-item ${msg.riskLevel}`}
                style={{
                  opacity:    isResolved ? 0.55 : 1,
                  transition: 'opacity 0.3s',
                  position:   'relative',
                }}
              >
                {/* Flag button — top-right corner */}
                <button
                  onClick={() => handleFlag(msg.id)}
                  title={isFlagged ? 'Unflag' : 'Flag this issue'}
                  style={{
                    position:   'absolute', top: 12, right: 12,
                    background: 'none', border: 'none',
                    fontSize:   '1.1rem', cursor: 'pointer',
                    color:      isFlagged ? '#ef4444' : '#cbd5e1',
                    transition: 'color 0.2s, transform 0.15s',
                    transform:  isFlagged ? 'scale(1.15)' : 'scale(1)',
                    lineHeight: 1,
                  }}
                  aria-pressed={isFlagged}
                >
                  🚩
                </button>

                <div className="feedback-header" style={{ paddingRight: 32 }}>
                  <strong>Anonymous Feedback ({msg.year} Year - {msg.subject})</strong>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>

                <p className="feedback-content">"{msg.suggestion}"</p>

                <div className="feedback-meta">
                  <span>Stress Index: <strong>{msg.exhaustion}/10</strong></span>
                  <span>Workload Rating: <strong>{msg.workload}/10</strong></span>
                  {isFlagged && (
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.82rem' }}>
                      🚩 Flagged
                    </span>
                  )}
                </div>

                <div className="feedback-actions">
                  {isResolved ? (
                    <span style={{
                      display:    'inline-flex', alignItems: 'center', gap: 6,
                      background: '#f0fdf4', color: '#16a34a',
                      border:     '1px solid #bbf7d0', borderRadius: 6,
                      padding:    '6px 14px', fontSize: '0.82rem', fontWeight: 700,
                    }}>
                      ✓ Resolved
                    </span>
                  ) : (
                    <button
                      className="secondary-btn sm"
                      onClick={() => handleResolve(msg.id)}
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FeedbackPanel;
