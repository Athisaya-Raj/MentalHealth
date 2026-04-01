import React, { useState } from "react";

const quotes = [
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
  { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
  { text: "Self-care is not self-indulgence, it is self-preservation.", author: "Audre Lorde" },
  { text: "Tough times never last, but tough people do.", author: "Robert H. Schuller" },
  { text: "It's okay to not be okay — as long as you are not giving up.", author: "Karen Salmansohn" },
];

const QuoteCard = () => {
  const [idx, setIdx] = useState(0);
  const q = quotes[idx];

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">🌟</span>
        <div>
          <p className="mw-section-title">Daily Quote</p>
          <p className="mw-section-desc">A little inspiration to brighten your day</p>
        </div>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
        border: "1px solid #dbeafe", borderRadius: 16,
        padding: "24px", textAlign: "center", position: "relative"
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 12, opacity: 0.4 }}>"</div>
        <p style={{
          fontSize: "1rem", color: "#1e3a5f", fontWeight: 600,
          lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic"
        }}>
          {q.text}
        </p>
        <p style={{ fontSize: "0.82rem", color: "#3b82f6", fontWeight: 700, margin: 0 }}>
          — {q.author}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16 }}>
        <button
          onClick={() => setIdx((idx - 1 + quotes.length) % quotes.length)}
          style={{
            padding: "8px 18px", borderRadius: 50, border: "2px solid #dbeafe",
            background: "#fff", color: "#3b82f6", fontWeight: 700,
            cursor: "pointer", fontSize: "0.82rem", transition: "all 0.2s"
          }}
        >← Prev</button>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {quotes.map((_, i) => (
            <span key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 18 : 8, height: 8, borderRadius: 50,
              background: i === idx ? "#3b82f6" : "#dbeafe",
              cursor: "pointer", transition: "all 0.3s"
            }} />
          ))}
        </span>
        <button
          onClick={() => setIdx((idx + 1) % quotes.length)}
          style={{
            padding: "8px 18px", borderRadius: 50, border: "2px solid #dbeafe",
            background: "#fff", color: "#3b82f6", fontWeight: 700,
            cursor: "pointer", fontSize: "0.82rem", transition: "all 0.2s"
          }}
        >Next →</button>
      </div>
    </div>
  );
};

export default QuoteCard;
