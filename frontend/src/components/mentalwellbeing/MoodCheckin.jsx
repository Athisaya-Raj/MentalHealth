import React, { useState } from "react";

const moods = [
  { emoji: "😄", label: "Great", color: "#4ade80", bg: "#f0fdf4" },
  { emoji: "🙂", label: "Happy", color: "#60a5fa", bg: "#eff6ff" },
  { emoji: "😐", label: "Neutral", color: "#facc15", bg: "#fefce8" },
  { emoji: "😞", label: "Stressed", color: "#fb923c", bg: "#fff7ed" },
  { emoji: "😣", label: "Overwhelmed", color: "#f87171", bg: "#fef2f2" },
];

const causes = [
  { label: "📚 Academics", key: "academics" },
  { label: "💼 Placements", key: "placements" },
  { label: "😴 Sleep", key: "sleep" },
  { label: "👥 Personal Issues", key: "personal" },
  { label: "📊 Workload", key: "workload" },
];

const MoodCheckin = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedCauses, setSelectedCauses] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleCause = (key) => {
    setSelectedCauses((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleSubmit = () => {
    if (selectedMood !== null) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">🌤️</span>
        <div>
          <h2 className="mw-section-title">Daily Mood Check-In</h2>
          <p className="mw-section-desc">Tap how you're feeling right now</p>
        </div>
      </div>

      <div className="mw-mood-grid">
        {moods.map((mood, i) => (
          <button
            key={i}
            className={`mw-mood-btn ${selectedMood === i ? "mw-mood-btn--active" : ""}`}
            style={{
              "--mood-color": mood.color,
              "--mood-bg": mood.bg,
            }}
            onClick={() => setSelectedMood(i)}
            aria-label={mood.label}
          >
            <span className="mw-mood-emoji">{mood.emoji}</span>
            <span className="mw-mood-label">{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood !== null && (
        <div className="mw-causes-section">
          <p className="mw-causes-title">What's contributing to your mood?</p>
          <div className="mw-chips">
            {causes.map((cause) => (
              <button
                key={cause.key}
                className={`mw-chip ${selectedCauses.includes(cause.key) ? "mw-chip--active" : ""}`}
                onClick={() => toggleCause(cause.key)}
              >
                {cause.label}
              </button>
            ))}
          </div>
          <button className="mw-submit-btn" onClick={handleSubmit}>
            {submitted ? "✅ Logged!" : "Save Check-In"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodCheckin;