import React from "react";
import MoodCheckin from "./MoodCheckin";
import StressRadar from "./StressRadar";
import CommunityWall from "./CommunityWall";
import SupportContact from "./SupportContact";
import "./mentalwellbeing.css";

function MentalDashboard() {
  return (
    <div className="mw-dashboard">
      <div className="mw-header">
        <h1>Mental Wellbeing</h1>
        <p>A safe space to check in, track your stress, and find support.</p>
      </div>

      <MoodCheckin />
      <StressRadar />
      <CommunityWall />
      <SupportContact />
    </div>
  );
}

export default MentalDashboard;
