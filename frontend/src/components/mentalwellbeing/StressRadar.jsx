import React, { useState } from "react";

const stressFactors = [
  { label: "Academic Stress", icon: "📚", key: "academic", invertedGood: true },
  { label: "Placement Pressure", icon: "💼", key: "placement", invertedGood: true },
  { label: "Sleep Quality", icon: "😴", key: "sleep", invertedGood: false },
  { label: "Motivation Level", icon: "🔥", key: "motivation", invertedGood: false },
];

const getEmoji = (value, invertedGood) => {
  if (invertedGood) {
    if (value <= 2) return { emoji: "😊", label: "Low", color: "#4ade80" };
    if (value === 3) return { emoji: "😐", label: "Medium", color: "#facc15" };
    return { emoji: "😣", label: "High", color: "#f87171" };
  } else {
    if (value <= 2) return { emoji: "😣", label: "Low", color: "#f87171" };
    if (value === 3) return { emoji: "😐", label: "Medium", color: "#facc15" };
    return { emoji: "😊", label: "High", color: "#4ade80" };
  }
};

const getTrackColor = (value, invertedGood) => {
  const feedback = getEmoji(value, invertedGood);
  return feedback.color;
};

const StressRadar = () => {
  const [values, setValues] = useState({
    academic: 3,
    placement: 3,
    sleep: 3,
    motivation: 3,
  });

  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: Number(val) }));
  };

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">📡</span>
        <div>
          <h2 className="mw-section-title">Stress Radar</h2>
          <p className="mw-section-desc">Slide to reflect your current levels</p>
        </div>
      </div>

      <div className="mw-sliders">
        {stressFactors.map((factor) => {
          const feedback = getEmoji(values[factor.key], factor.invertedGood);
          return (
            <div className="mw-slider-row" key={factor.key}>
              <div className="mw-slider-header">
                <span className="mw-slider-icon">{factor.icon}</span>
                <span className="mw-slider-label">{factor.label}</span>
                <span
                  className="mw-slider-feedback"
                  style={{ color: feedback.color }}
                >
                  {feedback.emoji} <span className="mw-slider-feedback-text">{feedback.label}</span>
                </span>
              </div>
              <div className="mw-slider-track-wrap">
                <span className="mw-slider-min">1</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={values[factor.key]}
                  onChange={(e) => handleChange(factor.key, e.target.value)}
                  className="mw-slider"
                  style={{
                    "--thumb-color": getTrackColor(values[factor.key], factor.invertedGood),
                    "--fill-pct": `${((values[factor.key] - 1) / 4) * 100}%`,
                  }}
                />
                <span className="mw-slider-max">5</span>
              </div>
              <div className="mw-slider-dots">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className={`mw-dot ${dot <= values[factor.key] ? "mw-dot--active" : ""}`}
                    style={
                      dot <= values[factor.key]
                        ? { background: getTrackColor(values[factor.key], factor.invertedGood) }
                        : {}
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StressRadar;