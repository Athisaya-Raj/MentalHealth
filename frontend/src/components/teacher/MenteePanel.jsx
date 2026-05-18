import React, { useState, useEffect } from 'react';
import './teacher.css';

// ── Note Modal ────────────────────────────────────────────────────────────────
const NoteModal = ({ mentee, onSave, onClose }) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    if (!text.trim()) return;
    const note = {
      student_id: mentee.studentRef,
      note:       text.trim(),
      timestamp:  new Date().toISOString(),
    };
    // Optional: POST to backend
    fetch('http://localhost:5000/api/notes', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(note),
    }).catch(() => { /* non-critical — UI updates regardless */ });

    onSave(mentee.id, note);
    onClose();
  };

  const onBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div
      onClick={onBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'mp-bg 0.18s ease',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: 18, width: '100%', maxWidth: 460,
        boxShadow: '0 24px 60px rgba(0,0,0,0.16)', overflow: 'hidden',
        animation: 'mp-in 0.22s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
          padding: '15px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ margin: 0, color: '#fff', fontWeight: 800, fontSize: '0.95rem' }}>
              📝 Add Note
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', marginTop: 2 }}>
              {mentee.studentRef} · {mentee.year} Year
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
          {/* Latest message context */}
          <div style={{
            background: '#f8faff', border: '1px solid #e0eeff',
            borderRadius: 10, padding: '10px 14px', marginBottom: 14,
          }}>
            <p style={{ margin: '0 0 3px', fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Latest Submission
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{mentee.suggestion}"
            </p>
          </div>

          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
            Your Note
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. Discuss stress due to project deadlines, suggest time management strategies..."
            rows={4}
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              border: `2px solid ${text.length > 0 ? '#3b82f6' : '#e2e8f0'}`,
              borderRadius: 10, padding: '10px 14px',
              fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.6,
              fontFamily: 'inherit', resize: 'none', outline: 'none',
              background: '#fafcff', transition: 'border-color 0.2s',
            }}
          />
          <p style={{ margin: '4px 0 14px', fontSize: '0.72rem', color: '#94a3b8', textAlign: 'right' }}>
            {text.length} characters
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{
              flex: 1, padding: '10px', borderRadius: 8,
              border: '1.5px solid #e2e8f0', background: '#fff',
              color: '#64748b', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
            }}>❌ Cancel</button>
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              style={{
                flex: 2, padding: '10px', borderRadius: 8, border: 'none',
                background: text.trim() ? 'linear-gradient(135deg,#2563eb,#3b82f6)' : '#e2e8f0',
                color: text.trim() ? '#fff' : '#94a3b8',
                fontWeight: 700, fontSize: '0.88rem',
                cursor: text.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >✅ Save Note</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Panel ────────────────────────────────────────────────────────────────
const MenteePanel = ({ data = [] }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [notes, setNotes]             = useState({});
  const [mentees, setMentees]         = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetchMenteesAndNotes = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId') || 'teacher';
        
        // Fetch real mentees
        const menteesRes = await fetch(`http://localhost:5000/api/teacher/students?mentor_id=${teacherId}`);
        const menteesJson = await menteesRes.json();
        
        // Use the aggregated dashboard data to match mentees and get their stats
        const realMentees = Array.isArray(menteesJson) ? menteesJson.map(m => {
          const stats = data.find(d => d.id === m._id.toString()) || {};
          return {
            id: m._id,
            studentRef: m.name,
            year: m.year,
            riskLevel: stats.riskLevel || 'low',
            exhaustion: stats.exhaustion || 3,
            workload: stats.workload || 3,
            timestamp: stats.timestamp || 'No recent activity',
            suggestion: stats.suggestion || 'No feedback submitted.'
          };
        }) : [];
        setMentees(realMentees);

        // Fetch real notes
        const notesRes = await fetch(`http://localhost:5000/api/notes?mentor_id=${teacherId}`);
        const notesJson = await notesRes.json();
        if (Array.isArray(notesJson)) {
          const notesMap = {};
          notesJson.forEach(n => {
            if (!notesMap[n.student_id]) notesMap[n.student_id] = [];
            notesMap[n.student_id].push(n);
          });
          setNotes(notesMap);
        }
      } catch (err) {
        console.error('Failed to fetch mentees/notes:', err);
      } finally {
        setLoading(false);
      }
    };
    
    // Only run if data is loaded
    if (data.length > 0) {
      fetchMenteesAndNotes();
    } else {
      setLoading(false);
    }
  }, [data]);

  const handleSaveNote = (menteeId, note) => {
    setNotes(prev => ({
      ...prev,
      [menteeId]: [note, ...(prev[menteeId] || [])],
    }));
  };

  return (
    <div className="teacher-panel-container">
      <style>{`
        @keyframes mp-bg { from { opacity:0; } to { opacity:1; } }
        @keyframes mp-in { from { opacity:0; transform:scale(0.93) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes mp-note-in { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {activeModal && (
        <NoteModal
          mentee={activeModal}
          onSave={handleSaveNote}
          onClose={() => setActiveModal(null)}
        />
      )}

      <div className="panel-header">
        <h3>My Assigned Mentees</h3>
        <p>Monitor the wellbeing and progress of your assigned mentees.</p>
      </div>

      {loading ? (
        <p style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading mentees...</p>
      ) : mentees.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#f8fafc', borderRadius: 12, border: '1px dashed #cbd5e1' }}>
          <span style={{ fontSize: '2rem' }}>👥</span>
          <p style={{ marginTop: 10, color: '#64748b', fontWeight: 600 }}>No mentees assigned.</p>
        </div>
      ) : (
        <div className="mentee-grid">
          {mentees.map(mentee => {
            const menteeNotes = notes[mentee.id] || notes[mentee.studentRef] || [];
            return (
              <div key={mentee.id} className="mentee-card">
                <div className="mentee-card-header">
                  <div className="mentee-avatar">👤</div>
                  <div>
                    <h4>{mentee.studentRef}</h4>
                    <span>{mentee.year} Year</span>
                  </div>
                  <span className={`mentee-status-dot ${mentee.riskLevel}`} />
                </div>

                <div className="mentee-stats">
                  <div className="stat-group">
                    <label>Recent Stress Score</label>
                    <strong>{mentee.exhaustion} / 10</strong>
                  </div>
                  <div className="stat-group">
                    <label>Academic Workload</label>
                    <strong>{mentee.workload} / 10</strong>
                  </div>
                  <div className="stat-group">
                    <label>Last Response</label>
                    <strong>{mentee.timestamp}</strong>
                  </div>
                </div>

                {/* Latest submission */}
                <div className="mentee-feedback-snippet">
                  <label>Latest Submission</label>
                  <p>"{mentee.suggestion}"</p>
                </div>

                {/* Notes — displayed immediately after saving */}
                {menteeNotes.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                    {menteeNotes.map((n, i) => (
                      <div
                        key={i}
                        style={{
                          background: '#fffbeb', border: '1px solid #fde68a',
                          borderRadius: 8, padding: '8px 12px',
                          animation: 'mp-note-in 0.25s ease',
                        }}
                      >
                        <p style={{ margin: '0 0 3px', fontSize: '0.68rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          📝 Note · {new Date(n.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#78350f', lineHeight: 1.5 }}>
                          {n.note}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mentee-actions" style={{ marginTop: 'auto' }}>
                  <button
                    className="secondary-btn"
                    style={{ width: '100%' }}
                    onClick={() => setActiveModal(mentee)}
                  >
                    📝 Add Note
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenteePanel;
