import React, { useState } from "react";

const MOODS = [
  { id: "great", emoji: "😄", label: "Great" },
  { id: "okay", emoji: "🙂", label: "Okay" },
  { id: "neutral", emoji: "😐", label: "Neutral" },
  { id: "stressed", emoji: "😞", label: "Stressed" },
  { id: "overwhelmed", emoji: "😣", label: "Overwhelmed" },
];

const CAUSES = [
  "Academics",
  "Placements",
  "Sleep",
  "Personal Issues",
  "Workload",
];

function MoodCheckin() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedCauses, setSelectedCauses] = useState([]);

  const toggleCause = (cause) => {
    setSelectedCauses((prev) =>
      prev.includes(cause)
        ? prev.filter((c) => c !== cause)
        : [...prev, cause]
    );
  };

  return (
    <div className="mw-card">
      <h2>How are you feeling today?</h2>
      
      <div className="mw-mood-container">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            className={`mw-mood-option ${selectedMood === mood.id ? "selected" : ""}`}
            onClick={() => setSelectedMood(mood.id)}
          >
            <span className="mw-mood-emoji">{mood.emoji}</span>
            <span className="mw-mood-label">{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mw-causes">
          <p>Care to share what's affecting your mood? (Optional)</p>
          <div className="mw-chip-container">
            {CAUSES.map((cause) => (
              <button
                key={cause}
                className={`mw-chip ${selectedCauses.includes(cause) ? "selected" : ""}`}
                onClick={() => toggleCause(cause)}
              >
                {cause}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodCheckin;
