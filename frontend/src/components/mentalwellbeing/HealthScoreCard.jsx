import React, { useState, useEffect } from "react";

const getScoreInfo = (score) => {
  if (score >= 70) return { label: "Low Risk", color: "#22c55e", bg: "#f0fdf4", border: "#bbf7d0", emoji: "🟢", message: "You're doing well 😊" };
  if (score >= 40) return { label: "Moderate Risk", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", emoji: "🟡", message: "Take care, manage your stress ⚠" };
  return { label: "High Risk", color: "#ef4444", bg: "#fef2f2", border: "#fecaca", emoji: "🔴", message: "High stress detected — consider reaching out 🚨" };
};

const HealthScoreCard = ({ stress = 4, sleep = 6, placementAnxiety = 3 }) => {
  const rawScore = (100 - stress * 10) + (sleep * 10) - (placementAnxiety * 5);
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));
  const info = getScoreInfo(score);

  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animated / 100) * circumference;

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">💙</span>
        <div>
          <p className="mw-section-title">Your Academic Health Score</p>
          <p className="mw-section-desc">Based on stress, sleep & placement anxiety</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {/* Circular Progress */}
        <div style={{ position: "relative", width: 120, height: 120 }}>
          <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="60" cy="60" r="45" fill="none" stroke="#e0eeff" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="45" fill="none"
              stroke={info.color} strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease, stroke 0.5s ease" }}
            />
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ fontSize: "1.6rem", fontWeight: 800, color: info.color }}>{animated}</span>
            <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600 }}>/ 100</span>
          </div>
        </div>

        {/* Risk Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: info.bg, border: `2px solid ${info.border}`,
          borderRadius: "50px", padding: "8px 20px"
        }}>
          <span style={{ fontSize: "1.1rem" }}>{info.emoji}</span>
          <span style={{ fontWeight: 700, color: info.color, fontSize: "0.95rem" }}>{info.label}</span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: "100%", maxWidth: 320 }}>
          <div style={{ height: 10, background: "#e0eeff", borderRadius: 50, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${animated}%`,
              background: `linear-gradient(90deg, ${info.color}, ${info.color}aa)`,
              borderRadius: 50, transition: "width 1s ease"
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>0</span>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>100</span>
          </div>
        </div>

        {/* Message */}
        <div style={{
          background: info.bg, border: `1px solid ${info.border}`,
          borderRadius: 12, padding: "12px 20px", textAlign: "center",
          fontSize: "0.9rem", fontWeight: 600, color: info.color, width: "100%", maxWidth: 320
        }}>
          {info.message}
        </div>

        {/* Factors */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "Stress", value: stress, icon: "😓", max: 10 },
            { label: "Sleep", value: sleep, icon: "😴", max: 10 },
            { label: "Anxiety", value: placementAnxiety, icon: "😰", max: 10 },
          ].map((f) => (
            <div key={f.label} style={{
              background: "#f8faff", border: "1px solid #e0eeff",
              borderRadius: 12, padding: "10px 16px", textAlign: "center", minWidth: 80
            }}>
              <div style={{ fontSize: "1.3rem" }}>{f.icon}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{f.label}</div>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#1e3a5f" }}>{f.value}/{f.max}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;
