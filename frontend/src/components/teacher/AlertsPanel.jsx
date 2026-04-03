import React, { useState, useEffect } from 'react';
import './teacher.css';

const PRIORITY_CONFIG = {
  high:   { label: 'HIGH RISK',   icon: '🔴', cls: 'critical', badge: '#ef4444', badgeBg: '#fef2f2' },
  medium: { label: 'MEDIUM RISK', icon: '🟡', cls: 'warning',  badge: '#f59e0b', badgeBg: '#fffbeb' },
  low:    { label: 'LOW RISK',    icon: '🟢', cls: 'info',     badge: '#22c55e', badgeBg: '#f0fdf4' },
};

const fmtTime = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    + ', ' + d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
};

// ── Reply Modal ──────────────────────────────────────────────────────────────
const ReplyModal = ({ alert, onClose, onSent }) => {
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const cfg = PRIORITY_CONFIG[alert.priority] || PRIORITY_CONFIG.low;

  const handleSend = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      await fetch('http://localhost:5000/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id:   'teacher',
          receiver_id: alert.sender_id || alert._id,
          message:     reply.trim(),
        }),
      });
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
    setSending(false);
    onSent(alert._id);
    onClose();
  };

  // close on backdrop click
  const onBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div
      onClick={onBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'ta-modal-bg 0.2s ease',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: 18, width: '100%', maxWidth: 480,
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden',
        animation: 'ta-modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${cfg.badge}dd, ${cfg.badge}99)`,
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ margin: 0, color: '#fff', fontWeight: 800, fontSize: '0.95rem' }}>
              {cfg.icon} Respond to {alert.studentName || 'Student'}
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', marginTop: 2 }}>
              {cfg.label}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
            fontSize: '0.85rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          {/* Message preview */}
          <div style={{
            background: '#f8faff', border: '1px solid #e0eeff',
            borderRadius: 10, padding: '10px 14px', marginBottom: 14,
          }}>
            <p style={{ margin: '0 0 4px', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Student Message
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.55, fontStyle: 'italic' }}>
              "{alert.message}"
            </p>
          </div>

          {/* Reply textarea */}
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
            Your Reply
          </label>
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Type your response to the student..."
            rows={4}
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              border: `2px solid ${reply.length > 0 ? '#3b82f6' : '#e0eeff'}`,
              borderRadius: 10, padding: '10px 14px',
              fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.6,
              fontFamily: 'inherit', resize: 'none', outline: 'none',
              background: '#fafcff', transition: 'border-color 0.2s',
            }}
          />

          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button onClick={onClose} style={{
              flex: 1, padding: '10px', borderRadius: 8,
              border: '1.5px solid #e2e8f0', background: '#fff',
              color: '#64748b', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
            }}>Cancel</button>
            <button
              onClick={handleSend}
              disabled={!reply.trim() || sending}
              style={{
                flex: 2, padding: '10px', borderRadius: 8, border: 'none',
                background: reply.trim() && !sending ? '#2563eb' : '#e2e8f0',
                color: reply.trim() && !sending ? '#fff' : '#94a3b8',
                fontWeight: 700, fontSize: '0.88rem',
                cursor: reply.trim() && !sending ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              {sending ? 'Sending...' : 'Send Message →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Panel ───────────────────────────────────────────────────────────────
const AlertsPanel = ({ data = [] }) => {
  const [liveAlerts, setLiveAlerts]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [dismissed, setDismissed]     = useState(new Set());
  const [responded, setResponded]     = useState(new Set());
  const [activeModal, setActiveModal] = useState(null); // alert object

  const staticAlerts = data
    .filter(d => d.riskLevel === 'high' || d.exhaustion >= 7)
    .map((d, i) => ({
      _id:         `static-${i}`,
      studentName: d.studentRef || 'Student',
      message:     d.riskLevel === 'high'
        ? `Critical stress level registered (${d.exhaustion}/10) alongside high workload.`
        : `Moderate risk detected. Notable exhaustion (${d.exhaustion}/10) reported.`,
      priority:    d.riskLevel === 'high' ? 'high' : 'medium',
      timestamp:   d.timestamp,
      source:      'survey',
    }));

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res  = await fetch('http://localhost:5000/api/teacher/alerts?mentor_id=teacher');
        const json = await res.json();
        if (Array.isArray(json)) setLiveAlerts(json);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const allAlerts = [
    ...liveAlerts.map(a => ({ ...a, source: 'message' })),
    ...staticAlerts,
  ].filter(a => !dismissed.has(a._id));

  const handleDismiss = (id) => setDismissed(prev => new Set([...prev, id]));
  const handleResponded = (id) => setResponded(prev => new Set([...prev, id]));

  return (
    <div className="teacher-panel-container">
      <style>{`
        @keyframes ta-modal-bg { from { opacity:0; } to { opacity:1; } }
        @keyframes ta-modal-in { from { opacity:0; transform:scale(0.93) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>

      {activeModal && (
        <ReplyModal
          alert={activeModal}
          onClose={() => setActiveModal(null)}
          onSent={handleResponded}
        />
      )}

      <div className="panel-header">
        <h3>Recent Alerts &amp; Notifications</h3>
        <p>Live alerts from student messages and survey responses.</p>
      </div>

      {loading && (
        <p style={{ padding: '16px 0', color: '#64748b', fontSize: '0.88rem' }}>Loading alerts...</p>
      )}

      <div className="alerts-container">
        {!loading && allAlerts.length === 0 && (
          <p className="no-alerts">No active alerts at this time. Everything looks stable.</p>
        )}

        {allAlerts.map((alert) => {
          const cfg        = PRIORITY_CONFIG[alert.priority] || PRIORITY_CONFIG.low;
          const isResponded = responded.has(alert._id);

          return (
            <div
              key={alert._id}
              className={`alert-card ${cfg.cls}`}
              style={{
                borderLeft: `4px solid ${cfg.badge}`,
                background: isResponded ? '#f8faff' : '#fff',
                borderRadius: 12, padding: '16px 18px', marginBottom: 12,
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                display: 'flex', gap: 14, alignItems: 'flex-start',
                opacity: isResponded ? 0.75 : 1,
                transition: 'opacity 0.3s',
              }}
            >
              <div style={{ fontSize: '1.5rem', flexShrink: 0, lineHeight: 1 }}>{cfg.icon}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: '#1e3a5f', fontSize: '0.92rem' }}>
                    {alert.studentName || 'Student'}
                  </span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px',
                    borderRadius: 50, background: cfg.badgeBg, color: cfg.badge,
                    border: `1px solid ${cfg.badge}44`,
                  }}>{cfg.label}</span>
                  {alert.source === 'message' && (
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px',
                      borderRadius: 50, background: '#eff6ff', color: '#3b82f6',
                      border: '1px solid #bfdbfe',
                    }}>💬 Message</span>
                  )}
                  {isResponded && (
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px',
                      borderRadius: 50, background: '#f0fdf4', color: '#16a34a',
                      border: '1px solid #bbf7d0',
                    }}>✓ Responded</span>
                  )}
                </div>

                <p style={{
                  margin: '0 0 6px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5,
                  overflow: 'hidden', textOverflow: 'ellipsis',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  "{alert.message}"
                </p>

                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                  🕐 {fmtTime(alert.timestamp)}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                <button
                  className="primary-btn sm"
                  style={{ fontSize: '0.75rem', padding: '5px 12px' }}
                  onClick={() => setActiveModal(alert)}
                >
                  {isResponded ? '↩ Reply Again' : 'Take Action'}
                </button>
                <button
                  className="dismiss-btn"
                  style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                  onClick={() => handleDismiss(alert._id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;
