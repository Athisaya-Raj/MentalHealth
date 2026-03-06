// OptionCard.jsx
export default function OptionCard({ emoji, label, selected, onSelect }) {
  return (
    <button
      className={`pl-option ${selected ? "pl-option--selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="pl-option__emoji">{emoji}</span>
      <span className="pl-option__label">{label}</span>
      <span className="pl-option__check">{selected ? "✓" : ""}</span>
    </button>
  );
}