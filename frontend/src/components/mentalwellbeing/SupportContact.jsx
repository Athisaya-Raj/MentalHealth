import React, { useState } from "react";

const supportOptions = [
  {
    icon: "👨‍🏫",
    title: "Talk to Mentor",
    desc: "Connect with your assigned faculty mentor for academic and personal guidance.",
    color: "#60a5fa",
    bg: "#eff6ff",
    border: "#bfdbfe",
    action: "Schedule a Meeting",
  },
  {
    icon: "🧑‍⚕️",
    title: "Contact Counselor",
    desc: "Speak confidentially with a trained campus counselor. Available Mon–Fri, 9am–5pm.",
    color: "#818cf8",
    bg: "#eef2ff",
    border: "#c7d2fe",
    action: "Book a Session",
  },
  {
    icon: "🚨",
    title: "Report Severe Stress",
    desc: "If you're in crisis or experiencing severe mental distress, get immediate support.",
    color: "#f87171",
    bg: "#fef2f2",
    border: "#fecaca",
    action: "Get Immediate Help",
    urgent: true,
  },
];

const SupportContact = () => {
  const [clicked, setClicked] = useState(null);

  const handleClick = (i) => {
    setClicked(i);
    setTimeout(() => setClicked(null), 2000);
  };

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">💙</span>
        <div>
          <h2 className="mw-section-title">Need Someone to Talk To?</h2>
          <p className="mw-section-desc">You don't have to go through this alone</p>
        </div>
      </div>

      <div className="mw-support-grid">
        {supportOptions.map((opt, i) => (
          <button
            key={i}
            className={`mw-support-card ${opt.urgent ? "mw-support-card--urgent" : ""} ${clicked === i ? "mw-support-card--pressed" : ""}`}
            style={{
              "--card-color": opt.color,
              "--card-bg": opt.bg,
              "--card-border": opt.border,
            }}
            onClick={() => handleClick(i)}
          >
            <div className="mw-support-icon">{opt.icon}</div>
            <div className="mw-support-body">
              <span className="mw-support-title">{opt.title}</span>
              <span className="mw-support-desc">{opt.desc}</span>
            </div>
            <span className="mw-support-cta">
              {clicked === i ? "✅ Connecting..." : opt.action} →
            </span>
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