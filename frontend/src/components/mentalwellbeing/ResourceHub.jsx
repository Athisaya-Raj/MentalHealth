import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "stress",  label: "😤 Stress",  color: "#ef4444", light: "#fef2f2", border: "#fecaca" },
  { id: "focus",   label: "🎯 Focus",   color: "#3b82f6", light: "#eff6ff", border: "#bfdbfe" },
  { id: "sleep",   label: "😴 Sleep",   color: "#8b5cf6", light: "#f5f3ff", border: "#ddd6fe" },
  { id: "anxiety", label: "💭 Anxiety", color: "#f59e0b", light: "#fffbeb", border: "#fde68a" },
];

const RESOURCES = {
  stress: [
    {
      icon: "🌬️", title: "Box Breathing", type: "tool",
      desc: "4-4-4-4 breathing to calm your nervous system instantly.",
      action: "Start", color: "#ef4444", light: "#fef2f2",
    },
    {
      icon: "🎧", title: "Stress Relief Sounds", type: "video",
      videoId: "m1vaUGtyo-A",
      desc: "Gentle audio to release tension in under 5 minutes.",
      action: "Listen", color: "#ef4444", light: "#fef2f2",
    },
    {
      icon: "📖", title: "5-4-3-2-1 Grounding", type: "write",
      desc: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
      prompt: "List what you notice around you right now — 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
      action: "Try It", color: "#ef4444", light: "#fef2f2",
    },
  ],
  focus: [
    {
      icon: "🎵", title: "Deep Focus Music", type: "video",
      videoId: "WPni755-Krg",
      desc: "Ambient music proven to boost concentration and flow.",
      action: "Watch", color: "#3b82f6", light: "#eff6ff",
    },
    {
      icon: "⏱️", title: "Pomodoro Timer", type: "tool",
      desc: "25 min work + 5 min break. The classic focus technique.",
      action: "Start", color: "#3b82f6", light: "#eff6ff",
    },
    {
      icon: "📝", title: "Brain Dump", type: "write",
      desc: "Write every thought on paper for 2 minutes to clear mental clutter.",
      prompt: "Write anything and everything on your mind right now. Don't filter — just let it out for 2 minutes.",
      action: "Start", color: "#3b82f6", light: "#eff6ff",
    },
  ],
  sleep: [
    {
      icon: "🌙", title: "Sleep Meditation", type: "video",
      videoId: "inpok4MKVLM",
      desc: "Guided meditation to quiet your mind before bed.",
      action: "Watch", color: "#8b5cf6", light: "#f5f3ff",
    },
    {
      icon: "🌡️", title: "Wind-Down Routine", type: "tip",
      desc: "No screens 30 min before bed. Dim lights, read, or journal.",
      action: "Read", color: "#8b5cf6", light: "#f5f3ff",
    },
    {
      icon: "🌬️", title: "4-7-8 Breathing", type: "tool",
      desc: "Inhale 4s, hold 7s, exhale 8s. Triggers sleep response.",
      action: "Start", color: "#8b5cf6", light: "#f5f3ff",
    },
  ],
  anxiety: [
    {
      icon: "💬", title: "Talk to Someone", type: "tip",
      desc: "Reach out to a friend, mentor, or counsellor — you're not alone.",
      action: "Read", color: "#f59e0b", light: "#fffbeb",
    },
    {
      icon: "✍️", title: "Worry Journal", type: "write",
      desc: "Write your worry, then write one small action you can take today.",
      prompt: "What's worrying you right now? Write it out — then write one small thing you can do about it today.",
      action: "Try It", color: "#f59e0b", light: "#fffbeb",
    },
    {
      icon: "🌬️", title: "Calm Breathing", type: "tool",
      desc: "Slow your breath to slow your thoughts. 5 cycles, right now.",
      action: "Start", color: "#f59e0b", light: "#fffbeb",
    },
  ],
};

const QUOTES = [
  "You don't have to be positive all the time. It's okay to feel what you feel.",
  "Progress, not perfection. One step at a time.",
  "Rest is not a reward — it's a requirement.",
  "Your mental health is just as important as your grades.",
];

// ── Breathing Tool ───────────────────────────────────────────────────────────

const PHASES = [
  { label: "Inhale",  dur: 4, color: "#3b82f6" },
  { label: "Hold",    dur: 4, color: "#8b5cf6" },
  { label: "Exhale",  dur: 6, color: "#10b981" },
];

function BreathingTool({ accentColor }) {
  const [running, setRunning] = useState(false);
  const [pIdx, setPIdx] = useState(0);
  const [count, setCount] = useState(4);
  const [scale, setScale] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) { clearInterval(ref.current); setPIdx(0); setCount(4); setScale(1); return; }
    let p = 0, c = PHASES[0].dur;
    setScale(1.45);
    ref.current = setInterval(() => {
      c--;
      setCount(c);
      if (c <= 0) {
        p = (p + 1) % PHASES.length;
        c = PHASES[p].dur;
        setPIdx(p);
        setCount(c);
        setScale(p === 2 ? 1 : 1.45);
      }
    }, 1000);
    return () => clearInterval(ref.current);
  }, [running]);

  const phase = PHASES[pIdx];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "8px 0" }}>
      <div style={{
        width: 90, height: 90, borderRadius: "50%",
        border: `3px solid ${running ? phase.color : accentColor}`,
        background: running ? `${phase.color}18` : `${accentColor}10`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        transform: `scale(${running ? scale : 1})`,
        transition: `transform ${running ? phase.dur * 0.9 : 0.3}s ease-in-out, border-color 0.4s, background 0.4s`,
        boxShadow: running ? `0 0 24px ${phase.color}44` : "none",
      }}>
        <span style={{ fontSize: "1.6rem" }}>🌬️</span>
        {running && <span style={{ fontSize: "0.7rem", fontWeight: 800, color: phase.color }}>{count}s</span>}
      </div>
      {running && (
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: phase.color }}>{phase.label}...</span>
      )}
      <button onClick={() => setRunning(r => !r)} style={{
        padding: "7px 22px", borderRadius: 50, border: "none",
        background: running ? "#fef2f2" : accentColor,
        color: running ? "#ef4444" : "#fff",
        fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
        outline: running ? "2px solid #fecaca" : "none",
        transition: "all 0.2s",
      }}>
        {running ? "⏹ Stop" : "▶ Begin"}
      </button>
    </div>
  );
}

// ── Pomodoro Tool ────────────────────────────────────────────────────────────

function PomodoroTool({ accentColor }) {
  const [work, setWork] = useState(true);
  const [secs, setSecs] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) { clearInterval(ref.current); return; }
    ref.current = setInterval(() => {
      setSecs(s => {
        if (s <= 1) {
          setWork(w => !w);
          clearInterval(ref.current);
          setRunning(false);
          return work ? 5 * 60 : 25 * 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [running]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const pct = work ? (secs / (25 * 60)) * 100 : (secs / (5 * 60)) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "8px 0" }}>
      <div style={{
        width: 90, height: 90, borderRadius: "50%", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="90" height="90" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
          <circle cx="45" cy="45" r="38" fill="none" stroke="#e0eeff" strokeWidth="6" />
          <circle cx="45" cy="45" r="38" fill="none" stroke={accentColor} strokeWidth="6"
            strokeDasharray={2 * Math.PI * 38}
            strokeDashoffset={2 * Math.PI * 38 * (1 - pct / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: accentColor }}>{fmt(secs)}</div>
          <div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 700 }}>{work ? "WORK" : "BREAK"}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setRunning(r => !r)} style={{
          padding: "7px 18px", borderRadius: 50, border: "none",
          background: running ? "#fef2f2" : accentColor,
          color: running ? "#ef4444" : "#fff",
          fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
          outline: running ? "2px solid #fecaca" : "none",
        }}>
          {running ? "⏸ Pause" : "▶ Start"}
        </button>
        <button onClick={() => { setRunning(false); setWork(true); setSecs(25 * 60); }} style={{
          padding: "7px 14px", borderRadius: 50,
          border: "2px solid #e0eeff", background: "#fff",
          color: "#64748b", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
        }}>↺</button>
      </div>
    </div>
  );
}

// ── Video Embed ──────────────────────────────────────────────────────────────

function VideoEmbed({ videoId, accentColor }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", width: "100%" }}>
      {playing ? (
        <iframe width="100%" height="160"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="video" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen style={{ display: "block" }}
        />
      ) : (
        <div onClick={() => setPlaying(true)} style={{
          background: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg) center/cover`,
          height: 130, position: "relative", cursor: "pointer", borderRadius: 12,
        }}>
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)",
            display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            }}>▶</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Writing Modal ────────────────────────────────────────────────────────────

const WRITE_DURATION = 120; // 2 minutes

function WritingModal({ resource, onClose }) {
  const [text, setText] = useState("");
  const [secs, setSecs] = useState(WRITE_DURATION);
  const [timerOn, setTimerOn] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);
  const textareaRef = useRef(null);

  // auto-focus textarea on open
  useEffect(() => { textareaRef.current?.focus(); }, []);

  useEffect(() => {
    if (!timerOn || done) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { clearInterval(timerRef.current); setTimerOn(false); setDone(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerOn, done]);

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const pct = ((WRITE_DURATION - secs) / WRITE_DURATION) * 100;

  const handleDone = () => {
    clearInterval(timerRef.current);
    setText("");
    setSecs(WRITE_DURATION);
    setTimerOn(false);
    setDone(false);
    onClose();
  };

  // close on backdrop click
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) handleDone(); };

  const timerColor = secs <= 30 ? "#ef4444" : resource.color;

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "rh-modal-bg 0.2s ease",
      }}
    >
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480,
        boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
        overflow: "hidden",
        animation: "rh-modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* Modal Header */}
        <div style={{
          background: `linear-gradient(135deg, ${resource.color}ee, ${resource.color}bb)`,
          padding: "18px 20px 16px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>{resource.icon}</span>
            <div>
              <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: "1rem" }}>{resource.title}</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", marginTop: 2 }}>
                Private — nothing is saved
              </p>
            </div>
          </div>
          <button onClick={handleDone} style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
            width: 28, height: 28, borderRadius: "50%", cursor: "pointer",
            fontSize: "0.9rem", fontWeight: 700, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* Prompt */}
        <div style={{ padding: "16px 20px 0" }}>
          <p style={{
            margin: 0, fontSize: "0.88rem", color: "#1e3a5f",
            fontWeight: 600, lineHeight: 1.6,
            background: resource.light, borderRadius: 10,
            padding: "10px 14px", border: `1px solid ${resource.color}33`,
          }}>
            💬 {resource.prompt}
          </p>
        </div>

        {/* Timer Row */}
        <div style={{ padding: "14px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
          {/* Progress arc */}
          <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
            <svg width="44" height="44" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="22" cy="22" r="18" fill="none" stroke="#e0eeff" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke={timerColor} strokeWidth="4"
                strokeDasharray={2 * Math.PI * 18}
                strokeDashoffset={2 * Math.PI * 18 * (1 - pct / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
              />
            </svg>
            <span style={{
              position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "0.6rem", fontWeight: 800, color: timerColor,
            }}>{fmt(secs)}</span>
          </div>

          <div style={{ flex: 1 }}>
            {done ? (
              <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700, color: "#10b981" }}>
                ✅ Time's up! Great job taking this moment for yourself.
              </p>
            ) : (
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
                {timerOn ? "Timer running — write freely" : "Start the timer when you're ready"}
              </p>
            )}
          </div>

          {!done && (
            <button onClick={() => setTimerOn(t => !t)} style={{
              padding: "6px 14px", borderRadius: 50, border: "none",
              background: timerOn ? "#fef2f2" : resource.light,
              color: timerOn ? "#ef4444" : resource.color,
              fontWeight: 700, fontSize: "0.75rem", cursor: "pointer",
              outline: timerOn ? "1.5px solid #fecaca" : `1.5px solid ${resource.color}44`,
              flexShrink: 0,
            }}>
              {timerOn ? "⏸ Pause" : secs < WRITE_DURATION ? "▶ Resume" : "▶ Start"}
            </button>
          )}
        </div>

        {/* Textarea */}
        <div style={{ padding: "12px 20px" }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Start writing here... this space is just for you."
            rows={6}
            style={{
              width: "100%", boxSizing: "border-box",
              border: `2px solid ${text.length > 0 ? resource.color + "66" : "#e0eeff"}`,
              borderRadius: 12, padding: "12px 14px",
              fontSize: "0.9rem", color: "#1e3a5f", lineHeight: 1.7,
              fontFamily: "'Nunito', 'Segoe UI', sans-serif",
              resize: "none", outline: "none",
              background: "#fafcff",
              transition: "border-color 0.2s",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
              {text.length > 0 ? `${text.split(/\s+/).filter(Boolean).length} words` : "No word count tracked"}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#cbd5e1" }}>🔒 Not saved anywhere</span>
          </div>
        </div>

        {/* Done Button */}
        <div style={{ padding: "0 20px 20px" }}>
          <button onClick={handleDone} style={{
            width: "100%", padding: "12px", borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${resource.color}, ${resource.color}cc)`,
            color: "#fff", fontWeight: 800, fontSize: "0.95rem",
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: `0 4px 16px ${resource.color}44`,
            transition: "all 0.2s",
          }}>
            ✓ Done — Clear & Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Resource Card ────────────────────────────────────────────────────────────

function ResourceCard({ resource, expanded, onToggle }) {
  const [writeOpen, setWriteOpen] = useState(false);
  const isWrite = resource.type === "write";

  const handleAction = () => {
    if (isWrite) setWriteOpen(true);
    else onToggle();
  };

  return (
    <>
      {writeOpen && <WritingModal resource={resource} onClose={() => setWriteOpen(false)} />}
      <div style={{
        background: "#fff", borderRadius: 16,
        border: `1.5px solid ${expanded ? resource.color : "#e0eeff"}`,
        boxShadow: expanded ? `0 6px 24px ${resource.color}22` : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "all 0.25s ease", overflow: "hidden",
        flex: "1 1 200px", minWidth: 0,
      }}>
        {/* Card Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: resource.light, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "1.3rem",
            }}>{resource.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 700, color: "#1e3a5f", fontSize: "0.9rem", lineHeight: 1.3 }}>
                {resource.title}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "0.76rem", color: "#64748b", lineHeight: 1.4 }}>
                {resource.desc}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={handleAction}
              style={{
                alignSelf: "flex-start", padding: "6px 16px", borderRadius: 50, border: "none",
                background: (!isWrite && expanded) ? resource.color : resource.light,
                color: (!isWrite && expanded) ? "#fff" : resource.color,
                fontWeight: 700, fontSize: "0.78rem", cursor: "pointer",
                transition: "all 0.2s", marginTop: 2,
              }}
            >
              {!isWrite && expanded ? "✕ Close" : `${resource.action} →`}
            </button>
            {isWrite && (
              <span style={{
                fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600,
                display: "flex", alignItems: "center", gap: 3,
              }}>✏️</span>
            )}
          </div>
        </div>

        {/* Expanded Content (non-write types only) */}
        {!isWrite && expanded && (
          <div style={{
            borderTop: `1px solid ${resource.color}22`,
            padding: "14px 16px",
            background: resource.light,
            animation: "rh-expand 0.2s ease",
          }}>
            {resource.type === "tool" && resource.title.toLowerCase().includes("breathing") && (
              <BreathingTool accentColor={resource.color} />
            )}
            {resource.type === "tool" && resource.title.toLowerCase().includes("pomodoro") && (
              <PomodoroTool accentColor={resource.color} />
            )}
            {resource.type === "tool" && resource.title.toLowerCase().includes("4-7-8") && (
              <BreathingTool accentColor={resource.color} />
            )}
            {resource.type === "tool" && resource.title.toLowerCase().includes("calm") && (
              <BreathingTool accentColor={resource.color} />
            )}
            {resource.type === "video" && (
              <VideoEmbed videoId={resource.videoId} accentColor={resource.color} />
            )}
            {resource.type === "tip" && (
              <p style={{
                margin: 0, fontSize: "0.88rem", color: "#1e3a5f",
                fontWeight: 600, lineHeight: 1.7, fontStyle: "italic",
              }}>
                💡 {resource.desc}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

const ResourceHub = () => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState("stress");
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [quoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));

  const cat = CATEGORIES.find(c => c.id === activeCat);
  const cards = RESOURCES[activeCat];

  const handleCat = (id) => { setActiveCat(id); setExpandedIdx(null); };
  const handleToggle = (i) => setExpandedIdx(prev => prev === i ? null : i);

  return (
    <div style={{
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      background: "#f4f8fc", minHeight: "100vh",
      display: "flex", flexDirection: "column",
    }}>
      <style>{`
        @keyframes rh-expand { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes rh-card-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes rh-modal-bg { from { opacity:0; } to { opacity:1; } }
        @keyframes rh-modal-in { from { opacity:0; transform:scale(0.93) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .rh-cat-chip { transition: all 0.2s ease; }
        .rh-cat-chip:hover { transform: translateY(-2px); }
        .rh-quick:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(239,68,68,0.25) !important; }
      `}</style>

      {/* ── Compact Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(29,78,216,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/student/home")} style={{
            background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)",
            color: "#fff", borderRadius: 8, padding: "6px 12px",
            fontSize: "0.8rem", fontWeight: 700, cursor: "pointer",
          }}>← Home</button>
          <div>
            <h1 style={{ margin: 0, color: "#fff", fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.2 }}>
              Wellbeing Resources 💙
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "0.75rem" }}>
              Find quick help based on what you need
            </p>
          </div>
        </div>
        {/* Quick Help */}
        <button
          className="rh-quick"
          onClick={() => handleCat("stress")}
          style={{
            background: "#ef4444", border: "none", color: "#fff",
            borderRadius: 50, padding: "8px 16px",
            fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 3px 12px rgba(239,68,68,0.3)", transition: "all 0.2s",
          }}
        >⚡ Calm Me Down</button>
      </div>

      {/* ── Daily Quote Strip ── */}
      <div style={{
        background: "#eff6ff", borderBottom: "1px solid #dbeafe",
        padding: "10px 24px", display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: "1rem" }}>🌟</span>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#1e40af", fontWeight: 600, fontStyle: "italic" }}>
          "{QUOTES[quoteIdx]}"
        </p>
      </div>

      {/* ── Category Chips ── */}
      <div style={{ padding: "16px 24px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className="rh-cat-chip"
            onClick={() => handleCat(c.id)}
            style={{
              padding: "9px 20px", borderRadius: 50, cursor: "pointer",
              fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit",
              border: `2px solid ${activeCat === c.id ? c.color : c.border}`,
              background: activeCat === c.id ? c.color : c.light,
              color: activeCat === c.id ? "#fff" : c.color,
              boxShadow: activeCat === c.id ? `0 4px 14px ${c.color}44` : "none",
            }}
          >{c.label}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <span style={{
            fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600,
            background: "#fff", border: "1px solid #e0eeff",
            borderRadius: 50, padding: "4px 12px",
          }}>
            {cards.length} help options
          </span>
        </div>
      </div>

      {/* ── Section Label ── */}
      <div style={{ padding: "14px 24px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 4, height: 18, borderRadius: 4, background: cat.color }} />
        <span style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.9rem" }}>
          {activeCat.charAt(0).toUpperCase() + activeCat.slice(1)} Help Options
        </span>
      </div>

      {/* ── Resource Cards ── */}
      <div style={{
        padding: "0 24px 24px",
        display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start",
      }}>
        {cards.map((r, i) => (
          <div key={`${activeCat}-${i}`} style={{
            flex: "1 1 220px", minWidth: 0,
            animation: `rh-card-in 0.25s ease ${i * 0.07}s both`,
          }}>
            <ResourceCard
              resource={r}
              expanded={expandedIdx === i}
              onToggle={() => handleToggle(i)}
            />
          </div>
        ))}
      </div>

      {/* ── Bottom Nav Hint ── */}
      <div style={{
        marginTop: "auto", padding: "12px 24px",
        borderTop: "1px solid #e0eeff", background: "#fff",
        display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
      }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => handleCat(c.id)} style={{
            padding: "5px 14px", borderRadius: 50, cursor: "pointer",
            border: `1.5px solid ${activeCat === c.id ? c.color : "#e0eeff"}`,
            background: activeCat === c.id ? c.light : "#fff",
            color: activeCat === c.id ? c.color : "#94a3b8",
            fontSize: "0.75rem", fontWeight: 700, fontFamily: "inherit",
            transition: "all 0.15s",
          }}>{c.label}</button>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;
