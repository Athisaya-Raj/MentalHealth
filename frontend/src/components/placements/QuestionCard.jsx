import { useState, useEffect } from "react";
import OptionCard from "./OptionCard";

export default function QuestionCard({ questionNumber, question, options, selectedIds, onAnswer }) {
  const [localSelected, setLocalSelected] = useState(selectedIds || []);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setLocalSelected(selectedIds || []);
    setExiting(false);
  }, [questionNumber]);

  const handleToggle = (optionId) => {
    setLocalSelected(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleConfirm = () => {
    if (localSelected.length === 0) return;
    setExiting(true);
    setTimeout(() => onAnswer(localSelected), 220);
  };

  return (
    <div className={`pl-question-card ${exiting ? "pl-question-card--exit" : ""}`}>
      <span className="pl-qcard__num">Question {questionNumber}</span>
      <p className="pl-qcard__question">{question}</p>
      <p style={{ fontSize: 12, color: "var(--gray-400)", margin: "-14px 0 16px", fontWeight: 600 }}>
        Select all that apply
      </p>
      <div className="pl-options">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            emoji={opt.emoji}
            label={opt.label}
            selected={localSelected.includes(opt.id)}
            onSelect={() => handleToggle(opt.id)}
          />
        ))}
      </div>
      <button
        onClick={handleConfirm}
        disabled={localSelected.length === 0}
        style={{
          marginTop: 18, width: "100%", padding: "13px",
          borderRadius: "var(--radius-md)", border: "none",
          background: localSelected.length > 0
            ? "linear-gradient(135deg, var(--blue-700), var(--blue-500))"
            : "var(--gray-200)",
          color: localSelected.length > 0 ? "#fff" : "var(--gray-400)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 15, fontWeight: 700, cursor: localSelected.length > 0 ? "pointer" : "not-allowed",
          boxShadow: localSelected.length > 0 ? "0 4px 16px rgba(59,130,246,0.30)" : "none",
          transition: "all 0.2s",
        }}
      >
        {localSelected.length === 0 ? "Select at least one option" : `Continue →`}
      </button>
    </div>
  );
}
