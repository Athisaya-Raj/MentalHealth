// QuestionCard.jsx
import { useState, useEffect } from "react";
import OptionCard from "./OptionCard";

export default function QuestionCard({ questionNumber, question, options, selectedId, onAnswer }) {
  const [localSelected, setLocalSelected] = useState(selectedId || "");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setLocalSelected(selectedId || "");
    setExiting(false);
  }, [questionNumber, selectedId]);

  const handleSelect = (optionId) => {
    if (localSelected) return;
    setLocalSelected(optionId);
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => onAnswer(optionId), 220);
    }, 420);
  };

  return (
    <div className={`pl-question-card ${exiting ? "pl-question-card--exit" : ""}`}>
      <span className="pl-qcard__num">Question {questionNumber}</span>
      <p className="pl-qcard__question">{question}</p>
      <div className="pl-options">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            emoji={opt.emoji}
            label={opt.label}
            selected={localSelected === opt.id}
            onSelect={() => handleSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}