import React, { useState, useEffect, useRef } from "react";

const tips = [
  { icon: "💧", text: "Drink a glass of water right now" },
  { icon: "🧍", text: "Stand up and stretch for 2 minutes" },
  { icon: "💬", text: "Talk to a friend or classmate" },
  { icon: "🌬️", text: "Take 5 deep breaths slowly" },
  { icon: "🚶", text: "Take a short 5-minute walk" },
  { icon: "📵", text: "Put your phone down for 10 minutes" },
];

const PHASES = [
  { label: "Inhale", duration: 4, color: "#3b82f6" },
  { label: "Hold", duration: 4, color: "#8b5cf6" },
  { label: "Exhale", duration: 6, color: "#10b981" },
];

const BreathingExercise = () => {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(PHASES[0].duration);
  const [scale, setScale] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    setPhaseIdx(0); setCount(PHASES[0].duration); setScale(1.5);
    let pIdx = 0, c = PHASES[0].duration;
    intervalRef.current = setInterval(() => {
      c--;
      setCount(c);
      if (c <= 0) {
        pIdx = (pIdx + 1) % PHASES.length;
        c = PHASES[pIdx].duration;
        setPhaseIdx(pIdx);
        setCount(c);
        setScale(pIdx === 0 ? 1.5 : pIdx === 2 ? 1 : 1.5);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const phase = PHASES[phaseIdx];

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 120, height: 120, borderRadius: "50%", margin: "0 auto 16px",
        background: `radial-gradient(circle, ${phase.color}33, ${phase.color}11)`,
        border: `3px solid ${phase.color}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        transform: `scale(${running ? scale : 1})`,
        transition: `transform ${phase.duration * 0.9}s ease-in-out, border-color 0.5s, background 0.5s`,
        boxShadow: running ? `0 0 30px ${phase.color}44` : "none"
      }}>
        <span style={{ fontSize: "1.8rem" }}>🌬️</span>
        {running && <span style={{ fontSize: "0.75rem", fontWeight: 700, color: phase.color }}>{count}s</span>}
      </div>
      {running && (
        <p style={{ fontWeight: 700, color: phase.color, fontSize: "1rem", margin: "0 0 12px" }}>
          {phase.label}...
        </p>
      )}
      <button
        onClick={() => setRunning(!running)}
        style={{
          padding: "10px 28px", borderRadius: 50, border: "none",
          background: running ? "#fef2f2" : "linear-gradient(135deg, #2563eb, #60a5fa)",
          color: running ? "#ef4444" : "#fff",
          fontWeight: 700, fontSize: "0.88rem", cursor: "pointer",
          border: running ? "2px solid #fecaca" : "none",
          transition: "all 0.2s"
        }}
      >
        {running ? "⏹ Stop" : "▶ Start Breathing"}
      </button>
      {!running && (
        <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: 8 }}>
          4s inhale → 4s hold → 6s exhale
        </p>
      )}
    </div>
  );
};

const StressTools = () => {
  const [breakActive, setBreakActive] = useState(false);
  const [breakTime, setBreakTime] = useState(300);
  const timerRef = useRef(null);

  useEffect(() => {
    if (breakActive) {
      timerRef.current = setInterval(() => {
        setBreakTime((t) => { if (t <= 1) { clearInterval(timerRef.current); setBreakActive(false); return 300; } return t - 1; });
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [breakActive]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">🧘</span>
        <div>
          <p className="mw-section-title">Stress Relief Tools</p>
          <p className="mw-section-desc">Quick exercises to reset and recharge</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Breathing */}
        <div style={{ background: "#f8faff", border: "1px solid #dbeafe", borderRadius: 16, padding: 20 }}>
          <p style={{ fontWeight: 700, color: "#1e3a5f", margin: "0 0 16px", fontSize: "0.95rem" }}>
            🌬️ Breathing Exercise
          </p>
          <BreathingExercise />
        </div>

        {/* Break Timer */}
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 16, padding: 20 }}>
          <p style={{ fontWeight: 700, color: "#92400e", margin: "0 0 4px", fontSize: "0.95rem" }}>
            ⏰ Take a Break Reminder
          </p>
          <p style={{ fontSize: "0.8rem", color: "#b45309", margin: "0 0 16px" }}>
            Set a 5-minute break timer to step away from your screen
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              fontSize: "1.8rem", fontWeight: 800, color: "#d97706",
              background: "#fff", border: "2px solid #fde68a",
              borderRadius: 12, padding: "8px 20px", minWidth: 80, textAlign: "center"
            }}>
              {fmt(breakTime)}
            </div>
            <button
              onClick={() => { setBreakActive(!breakActive); if (!breakActive) setBreakTime(300); }}
              style={{
                padding: "10px 20px", borderRadius: 50, border: "none",
                background: breakActive ? "#fef2f2" : "#f59e0b",
                color: breakActive ? "#ef4444" : "#fff",
                fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
                border: breakActive ? "2px solid #fecaca" : "none"
              }}
            >
              {breakActive ? "⏹ Cancel" : "▶ Start Break"}
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 20 }}>
          <p style={{ fontWeight: 700, color: "#166534", margin: "0 0 14px", fontSize: "0.95rem" }}>
            💡 Quick Wellness Tips
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
            {tips.map((tip, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #bbf7d0",
                borderRadius: 12, padding: "12px 14px",
                display: "flex", alignItems: "flex-start", gap: 8
              }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{tip.icon}</span>
                <span style={{ fontSize: "0.8rem", color: "#166534", fontWeight: 600, lineHeight: 1.4 }}>{tip.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTools;
