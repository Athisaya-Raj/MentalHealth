import React, { useState } from "react";

const videos = [
  {
    id: "inpok4MKVLM",
    title: "5-Minute Meditation",
    desc: "A quick guided meditation to calm your mind between study sessions.",
    tag: "🧘 Meditation",
    tagColor: "#8b5cf6",
    tagBg: "#f5f3ff",
  },
  {
    id: "WPni755-Krg",
    title: "Deep Focus Study Music",
    desc: "Ambient music to help you concentrate and get into flow state.",
    tag: "🎵 Focus",
    tagColor: "#3b82f6",
    tagBg: "#eff6ff",
  },
  {
    id: "m1vaUGtyo-A",
    title: "Stress Relief & Relaxation",
    desc: "Gentle breathing and relaxation techniques to release tension.",
    tag: "💆 Stress Relief",
    tagColor: "#10b981",
    tagBg: "#f0fdf4",
  },
];

const VideoSection = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">🎥</span>
        <div>
          <p className="mw-section-title">Calming Videos</p>
          <p className="mw-section-desc">Take a break and recharge with these curated videos</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {videos.map((v) => (
          <div key={v.id} style={{
            border: "1px solid #dbeafe", borderRadius: 16,
            overflow: "hidden", background: "#f8faff",
            transition: "box-shadow 0.2s", boxShadow: active === v.id ? "0 4px 20px rgba(59,130,246,0.15)" : "none"
          }}>
            {active === v.id ? (
              <iframe
                width="100%" height="220"
                src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                title={v.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: "block" }}
              />
            ) : (
              <div
                onClick={() => setActive(v.id)}
                style={{
                  background: `url(https://img.youtube.com/vi/${v.id}/hqdefault.jpg) center/cover`,
                  height: 160, position: "relative", cursor: "pointer"
                }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s"
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(255,255,255,0.9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
                  }}>▶</div>
                </div>
              </div>
            )}
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{
                  background: v.tagBg, color: v.tagColor,
                  fontSize: "0.72rem", fontWeight: 700,
                  padding: "3px 10px", borderRadius: 50
                }}>{v.tag}</span>
              </div>
              <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#1e3a5f", fontSize: "0.92rem" }}>{v.title}</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
