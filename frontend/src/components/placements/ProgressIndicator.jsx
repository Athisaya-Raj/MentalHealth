// =============================================
// ProgressIndicator.jsx
// Shows step X of Y with a segmented bar.
// No CSS import needed — uses placements.css
// =============================================

/**
 * ProgressIndicator
 * Props:
 *  - current : 1-based current step number (e.g. 2)
 *  - total   : total number of steps (e.g. 4)
 *  - label   : heading text shown above the bar
 */
const ProgressIndicator = ({ current, total, label = "Placement Check-In" }) => {
  return (
    <div className="pl-progress">
      {/* Top row: title + "Step X of Y" badge */}
      <div className="pl-progress__meta">
        <span className="pl-progress__label">{label}</span>
        <span className="pl-progress__step">Step {current} of {total}</span>
      </div>

      {/* Segmented dot bar */}
      <div className="pl-progress__dots">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          let cls = "pl-progress__dot";
          if (stepNum < current)  cls += " pl-progress__dot--done";
          if (stepNum === current) cls += " pl-progress__dot--active";
          return <div key={i} className={cls} />;
        })}
      </div>
    </div>
  );
}

export default ProgressIndicator;