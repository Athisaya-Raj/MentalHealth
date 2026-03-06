// =============================================
// CompletionCard.jsx
// Shown when all 4 questions are answered.
// Displays a summary of answers and a done button.
// No CSS import needed — uses placements.css
// =============================================

/**
 * CompletionCard
 * Props:
 *  - answers   : { preparationFrequency, preparationChallenge,
 *                  internshipStatus, interviewConfidence }
 *  - questions : array of question objects (to look up chosen labels)
 *  - onReset   : callback to restart the check-in
 */
function CompletionCard({ answers, questions, onReset }) {
  // Map each answer id back to its human-readable label + emoji
  const summaryRows = questions.map((q) => {
    const chosen = q.options.find((o) => o.id === answers[q.fieldKey]);
    return {
      shortLabel: q.shortLabel,
      answer: chosen ? `${chosen.emoji} ${chosen.label}` : "—",
    };
  });

  return (
    <div className="pl-completion">
      {/* Animated checkmark icon */}
      <div className="pl-completion__icon">🎉</div>

      <h2 className="pl-completion__title">Check-In Complete!</h2>

      <span className="pl-completion__msg">
        Thanks for completing your placement check-in.
        Your responses help identify student placement wellbeing trends.
      </span>

      {/* Answers summary */}
      <div className="pl-completion__summary">
        <div className="pl-completion__summary-title">Your Responses</div>

        {summaryRows.map((row, i) => (
          <div key={i} className="pl-completion__row">
            <span className="pl-completion__row-q">{row.shortLabel}</span>
            <span className="pl-completion__row-a">{row.answer}</span>
          </div>
        ))}
      </div>

      {/* Done / restart button */}
      <button className="pl-completion__btn" onClick={onReset}>
        Do It Again →
      </button>
    </div>
  );
}

export default CompletionCard;