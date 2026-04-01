import React from "react";
import { useNavigate } from "react-router-dom";
import MoodCheckin from "./MoodCheckin";
import StressRadar from "./StressRadar";
import CommunityWall from "./CommunityWall";
import SupportContact from "./SupportContact";
import HealthScoreCard from "./HealthScoreCard";
import "./mentalwellbeing.css";

const MentalDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="mw-dashboard">
      {/* Compact header replaces large hero */}
      <div style={{
        background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(29,78,216,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="mw-hero-badge" style={{ margin: 0 }}>🌿 Wellness Space</div>
          <div>
            <h1 style={{ margin: 0, color: "#fff", fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.2 }}>
              How are you doing today?
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "0.72rem" }}>
              Check in, reflect, and reach out — you're not alone.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/student/home")}
          style={{
            background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)",
            color: "#fff", borderRadius: 8, padding: "6px 14px",
            fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", flexShrink: 0,
          }}
        >🏠 Home</button>
      </div>

      <div className="mw-sections">
        <div className="mw-card">
          <HealthScoreCard stress={4} sleep={6} placementAnxiety={3} />
        </div>
        <div className="mw-card">
          <MoodCheckin />
        </div>
        <div className="mw-card">
          <StressRadar />
        </div>
        <div className="mw-card">
          <CommunityWall />
        </div>
        <div className="mw-card">
          <SupportContact />
        </div>
      </div>
    </div>
  );
};

export default MentalDashboard;