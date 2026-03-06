import React, { useState } from "react";

const SLIDERS = [
  { id: "academics", label: "Academics Stress" },
  { id: "placements", label: "Placement Pressure" },
  { id: "sleep", label: "Sleep Quality" },
  { id: "motivation", label: "Motivation Level" },
];

function StressRadar() {
  const [values, setValues] = useState({
    academics: 3,
    placements: 3,
    sleep: 3,
    motivation: 3,
  });

  const handleChange = (id, newValue) => {
    setValues((prev) => ({ ...prev, [id]: newValue }));
  };

  return (
    <div className="mw-card">
      <h2>Stress Radar</h2>
      
      <div className="mw-sliders-container">
        {SLIDERS.map((slider) => (
          <div key={slider.id} className="mw-slider-group">
            <div className="mw-slider-header">
              <label htmlFor={`slider-${slider.id}`}>{slider.label}</label>
              <span>{values[slider.id]} / 5</span>
            </div>
            <input
              type="range"
              id={`slider-${slider.id}`}
              className="mw-slider"
              min="1"
              max="5"
              step="1"
              value={values[slider.id]}
              onChange={(e) => handleChange(slider.id, parseInt(e.target.value, 10))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StressRadar;
