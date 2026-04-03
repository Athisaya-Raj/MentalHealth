import React, { useState } from "react";

const supportOptions = [
  {
    icon: "👨‍🏫",
    title: "Talk to Mentor",
    desc: "Connect with your assigned faculty mentor for academic and personal guidance.",
    color: "#60a5fa",
    bg: "#eff6ff",
    border: "#bfdbfe",
    action: "Send a Message",
    prompt: "Describe your concern to your mentor",
    placeholder: "Hi, I wanted to reach out about...",
  },
  {
    icon: "🧑‍⚕️",
    title: "Contact Counselor",
    desc: "Speak confidentially with a trained campus counselor. Available Mon–Fri, 9am–5pm.",
    color: "#818cf8",
    bg: "#eef2ff",
    border: "#c7d2fe",
    action: "Send a Message",
    prompt: "Describe your concern to the counselor",
    placeholder: "I've been feeling...",
  },
];

const MessageBox = ({ opt, onClose }) => {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      const studentId  = localStorage.getItem('studentId') || 'dummy-student-id';
      const receiverId = opt.title === 'Talk to Mentor' ? 'teacher' : 'counselor';
      await fetch('http://localhost:5000/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id:   studentId,
          receiver_id: receiverId,
          message:     text.trim(),
        }),
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
    setSent(true);
    setTimeout(() => {
      setText('');
      setSent(false);
      onClose();
    }, 1800);
  };

  const handleClose = () => {
    setText("");
    setSent(false);
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "mw-fade-in 0.2s ease",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440,
        boxShadow: "0 24px 60px rgba(0,0,0,0.18)", overflow: "hidden",
        animation: "mw-pop 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${opt.color}ee, ${opt.color}99)`,
          padding: "16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.5rem" }}>{opt.icon}</span>
            <div>
              <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: "0.95rem" }}>{opt.title}</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "0.72rem" }}>Confidential</p>
            </div>
          </div>
          <button onClick={handleClose} style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
            width: 28, height: 28, borderRadius: "50%", cursor: "pointer",
            fontSize: "0.85rem", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 20px 20px" }}>
          <p style={{
            margin: "0 0 12px", fontSize: "0.85rem", fontWeight: 600, color: "#1e3a5f",
            background: opt.bg, borderRadius: 10, padding: "9px 14px",
            border: `1px solid ${opt.border}`,
          }}>
            💬 {opt.prompt}
          </p>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={opt.placeholder}
            rows={4}
            autoFocus
            style={{
              width: "100%", boxSizing: "border-box",
              border: `2px solid ${text.length > 0 ? opt.color + "88" : "#e0eeff"}`,
              borderRadius: 12, padding: "11px 14px",
              fontSize: "0.88rem", color: "#1e3a5f", lineHeight: 1.65,
              fontFamily: "'Nunito','Segoe UI',sans-serif",
              resize: "none", outline: "none", background: "#fafcff",
              transition: "border-color 0.2s",
            }}
          />

          {sent && (
            <p style={{ margin: "8px 0 0", fontSize: "0.82rem", fontWeight: 700, color: "#10b981" }}>
              ✅ Message sent! They'll get back to you soon.
            </p>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button onClick={handleClose} style={{
              flex: 1, padding: "10px", borderRadius: 10,
              border: "1.5px solid #e0eeff", background: "#fff",
              color: "#64748b", fontWeight: 700, fontSize: "0.85rem",
              cursor: "pointer", fontFamily: "inherit",
            }}>Cancel</button>
            <button onClick={handleSend} disabled={!text.trim() || sent} style={{
              flex: 2, padding: "10px", borderRadius: 10, border: "none",
              background: text.trim() && !sent
                ? `linear-gradient(135deg, ${opt.color}, ${opt.color}cc)`
                : "#e0eeff",
              color: text.trim() && !sent ? "#fff" : "#94a3b8",
              fontWeight: 800, fontSize: "0.88rem", cursor: text.trim() && !sent ? "pointer" : "not-allowed",
              fontFamily: "inherit", transition: "all 0.2s",
            }}>
              {sent ? "✓ Sent" : "Send Message →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportContact = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">💙</span>
        <div>
          <h2 className="mw-section-title">Need Someone to Talk To?</h2>
          <p className="mw-section-desc">You don't have to go through this alone</p>
        </div>
      </div>

      {activeModal !== null && (
        <MessageBox opt={supportOptions[activeModal]} onClose={() => setActiveModal(null)} />
      )}

      <div className="mw-support-grid">
        {supportOptions.map((opt, i) => (
          <button
            key={i}
            className="mw-support-card"
            style={{ "--card-color": opt.color, "--card-bg": opt.bg, "--card-border": opt.border }}
            onClick={() => setActiveModal(i)}
          >
            <div className="mw-support-icon">{opt.icon}</div>
            <div className="mw-support-body">
              <span className="mw-support-title">{opt.title}</span>
              <span className="mw-support-desc">{opt.desc}</span>
            </div>
            <span className="mw-support-cta">{opt.action} →</span>
          </button>
        ))}
      </div>

      <p className="mw-support-note">
        🔒 All interactions are confidential and handled with care by certified professionals.
      </p>
    </div>
  );
};

export default SupportContact;
