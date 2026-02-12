import React from 'react';
import './timetable.css';

/**
 * Reusable slider with visible scale, current-value badge, and labelled endpoints.
 * Props:
 *  label      – field label text
 *  name       – state key
 *  value      – current numeric value
 *  min        – minimum (default 1)
 *  max        – maximum (default 5)
 *  lowLabel   – left endpoint label
 *  highLabel  – right endpoint label
 *  onChange   – (name, value) callback
 *  gradient   – optional CSS gradient string for track fill
 */
export default function SliderField({
  label,
  name,
  value,
  min = 1,
  max = 5,
  lowLabel = 'Low',
  highLabel = 'High',
  onChange,
  gradient,
}) {
  const pct = ((value - min) / (max - min)) * 100;

  const trackStyle = {
    background: gradient
      ? `linear-gradient(to right, ${gradient} ${pct}%, #dbeafe ${pct}%)`
      : `linear-gradient(to right, #3b82f6 ${pct}%, #dbeafe ${pct}%)`,
  };

  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="tt-field">
      <div className="tt-label">
        <span>{label}</span>
        <span className="tt-label-value">{value}</span>
      </div>
      <div className="tt-slider-wrap">
        <input
          type="range"
          className="tt-slider"
          min={min}
          max={max}
          value={value}
          style={trackStyle}
          onChange={e => onChange(name, Number(e.target.value))}
        />
        <div className="tt-slider-ticks">
          {ticks.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="tt-slider-scale">
          <span className="scale-low">{lowLabel}</span>
          <span className="scale-high">{highLabel}</span>
        </div>
      </div>
    </div>
  );
}
