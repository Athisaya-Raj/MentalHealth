// OptionCard.jsx — checkbox-style multi-select
export default function OptionCard({ emoji, label, selected, onSelect }) {
  return (
    <button
      className={`pl-option ${selected ? "pl-option--selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="pl-option__emoji">{emoji}</span>
      <span className="pl-option__label">{label}</span>
      {/* Checkbox indicator instead of single checkmark */}
      <span className="pl-option__check" style={{
        borderRadius: 5,
        background: selected ? "var(--blue-500)" : "var(--white)",
        borderColor: selected ? "var(--blue-500)" : "var(--gray-200)",
      }}>
        {selected ? "✓" : ""}
      </span>
    </button>
  );
}
